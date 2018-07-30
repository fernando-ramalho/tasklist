//using System.Web.Hosting;
//using System.Web.Services.Description;

//public class Startup
//{
//  public void ConfigureServices(ServiceCollection services)
//  {
//    services.AddMvc();
    
//    // 1. Add Authentication Services
//    services.AddAuthentication(options =>
//    {
//        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

//    }).AddJwtBearer(options =>
//    {
//        options.Authority = "https://fbarbosa.auth0.com/";
//        options.Audience = "http://www.tasklistsupero.somee.com/tasklistwebapi";
//    });
//  }

//  public void Configure(IApplicationBuilder app, HostingEnvironment env)
//  {
//    if (env.IsDevelopment())
//    {
//        app.UseDeveloperExceptionPage();
//    }
//    else
//    {
//        app.UseExceptionHandler("/Home/Error");
//    }

//    app.UseStaticFiles();

//    // 2. Enable authentication middleware
//    app.UseAuthentication();

//    app.UseMvc(routes =>
//    {
//        routes.MapRoute(
//            name: "default",
//            template: "{controller=Home}/{action=Index}/{id?}");
//    });
//  }
//}