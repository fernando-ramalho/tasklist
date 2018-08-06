using System;
using System.Linq;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq.Expressions;
using System.Reflection;

using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Core.Objects.DataClasses;
using Supero.TaskList.Data;
using Supero.TaskList.Data.Models;

namespace Supero.TaskList.Data
{
    public abstract class BaseRepository<TEntity> : IRepository<TEntity> where TEntity : class, IEntity
    {
        #region Constructor
        protected BaseRepository() {
            CreateDbContext();
            DbSet = this.DbContext.Set<TEntity>();
        }

        protected BaseRepository(DbContext dbContext)
        {
            if (dbContext == null)
                throw new ArgumentNullException("Null DbContext");


            this.DbContext = dbContext;
            DbSet = this.DbContext.Set<TEntity>();
        }
        #endregion

        #region Attributes & Properties
        protected DbContext DbContext { get; set; }

        public ObjectContext ObjectContext
        {
            get { return ((IObjectContextAdapter)this.DbContext).ObjectContext; }
        }

        protected DbSet<TEntity> DbSet { get; set; }
        #endregion

        #region Public Methods
        public static bool IsProxy(object type)
        {
            return type != null && ObjectContext.GetObjectType(type.GetType()) != type.GetType();
        }
        //public static IRepository GetInstance<TRepository>(DbContext context)
        //public static TRepository GetInstance<TRepository>(DbContext context)
        //    where TRepository : IRepository
        //{
        //    Type type = typeof(TRepository);

        //    ConstructorInfo constructor = type.GetConstructor(new[] { typeof(DbContext) });
        //    return (TRepository)constructor.Invoke(new object[] { context });
        //}

        public virtual void CreateDbContext()
        {
            this.DbContext = new SuperoTaskListContext();

            // Do NOT enable proxied entities, else serialization fails.
            //if false it will not get the associated certification and skills when we
            //get the applicants
            //BaseDBContext.Configuration.ProxyCreationEnabled = false;

            // Load navigation properties explicitly (avoid serialization trouble)
            this.DbContext.Configuration.LazyLoadingEnabled = true;

            // Because Web API will perform validation, we don't need/want EF to do so
            this.DbContext.Configuration.ValidateOnSaveEnabled = false;

            // We won't use this performance tweak because we don't need 
            // the extra performance and, when autodetect is false,
            // we'd have to be careful. We're not being that careful.
            //---------------------------------------------------------
            //BaseDBContext.Configuration.AutoDetectChangesEnabled = false;
        }

        #region IDisposable

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (this.DbContext != null)
                {
                    this.DbContext.Dispose();
                }
            }
        }

        #endregion

        #region Search
        public virtual IQueryable<TEntity> GetAllNoTracking()
        {
            var list = DbSet.AsNoTracking();
            return list.AsQueryable();
        }

        public virtual IQueryable<TEntity> GetAll()
        {
            return DbSet;
        }

        public virtual TEntity GetByID(Int64 id)
        {
            return DbSet.Find(id);
        }


        public virtual IQueryable<TEntity> GetWhere(Expression<Func<TEntity, Boolean>> predicate)
        {
            return DbSet.Where(predicate);
        }

        #endregion

        #region Persistence

        public virtual void Insert(TEntity entity)
        {
            DbEntityEntry dbEntityEntry = this.DbContext.Entry(entity);
            if (dbEntityEntry.State != EntityState.Detached)
            {
                dbEntityEntry.State = EntityState.Added;
            }
            else
            {
                DbSet.Add(entity);
            }
        }

        public virtual void Update(TEntity entity)
        {
            DbEntityEntry dbEntityEntry = this.DbContext.Entry(entity);
            if (dbEntityEntry.State == EntityState.Detached)
            {
                DbSet.Attach(entity);
            }
            dbEntityEntry.State = EntityState.Modified;
        }

        public virtual void Delete(TEntity entity)
        {
            DbEntityEntry dbEntityEntry = this.DbContext.Entry(entity);
            if (dbEntityEntry.State != EntityState.Deleted)
            {
                dbEntityEntry.State = EntityState.Deleted;
            }
            else
            {
                DbSet.Attach(entity);
                DbSet.Remove(entity);
            }
        }

        public virtual void Delete(Int64 id)
        {
            var entity = GetByID(id);
            if (entity == null) return; // not found; assume already deleted.
            Delete(entity);
        }

        /// <summary>
        /// Save pending changes to the database
        /// </summary>
        public void Commit()
        {
            this.DbContext.SaveChanges();
        }
        #endregion

        #endregion

    }
}
