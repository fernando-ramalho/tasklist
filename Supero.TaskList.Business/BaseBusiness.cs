
using log4net;
using Supero.TaskList.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Supero.TaskList.Business
{
    public abstract class BaseBusiness<TRepository, TEntity> : IBusiness<TEntity>, IDisposable
          where TRepository : class, IRepository<TEntity>, new()
        where TEntity : class, IEntity, new()
    {
        #region Attributes & Properties

        protected ILog Logger { get; private set; }
        internal IRepository<TEntity> RepositoryInstance { get; }

        #endregion

        #region Constructor

        protected BaseBusiness()
        {
            Logger = LogManager.GetLogger(GetType());
            this.RepositoryInstance = new TRepository();
        }
        #endregion

        public void Dispose()
        {

        }
        public IQueryable<TEntity> GetAll()
        {
            return this.RepositoryInstance.GetAll();
        }

        public virtual TEntity GetByID(long id)
        {
            return this.RepositoryInstance.GetByID(id);
        }
        public virtual IQueryable<TEntity> GetWhere(Expression<Func<TEntity, bool>> predicate)
        {
            return this.RepositoryInstance.GetWhere(predicate);
        }
        public virtual bool Insert(TEntity entity)
        {
            try
            {
                this.RepositoryInstance.Insert(entity);
                return true;
            }
            catch (Exception ex)
            {
                Logger.Error($"Erro ao incluir",ex);
                return false;
             }
            
        }
        public virtual bool Update(TEntity entity)
        {
            try
            {
               this.RepositoryInstance.Update(entity);
                return true;
            }
            catch (Exception ex)
            {
                Logger.Error($"Erro ao atualizar", ex);
                return false;
            }

        }
        public virtual bool Delete(long id)
        {
            try
            {
                this.RepositoryInstance.Delete(id);
                return true;
            }
            catch (Exception ex)
            {
                Logger.Error($"Erro ao excluir", ex);
                return false;
            }
        }
        public virtual bool Delete(TEntity entity)
        {
            try
            {
                this.RepositoryInstance.Delete(entity);
                return true;
            }
            catch (Exception ex)
            {
                Logger.Error($"Erro ao excluir", ex);
                return false;
            }
        }
    }
}
