using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataHandler.Encoder;
using Microsoft.Owin.Security.Jwt;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using System.Threading.Tasks;

namespace Supero.TaskList.WebAPI
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //Dot.Net Core
            //services.AddAuthentication(options =>
            //{
            //    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            //    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            //}

            //public void Configure(IApplicationBuilder app, IHostingEnvironment env)
            //{
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

            //}


            ConfigureOAuth(app);

            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);

        }

        public void ConfigureOAuth(IAppBuilder app)
        {
            //var issuer = "https://fbarbosa.auth0.com/";
            //var audiences = "http://www.tasklistsupero.somee.com/tasklistwebapi";
            //var secret = "";

            var issuer = "https://fbarbosa.auth0.com/";
            var audiences = "http://localhost3001";
            var secret = "zzJJhGNli7-h0moA1xNDPHiLUFmY7mCMnQPZkXm20YRiwNemc5hu9U7IMs3azWBt";
                         //"11yAZKirJuqEHSl8XUk1zbhcv7PA4nQgCz_aAfulPNzjqCeXl6o7zv8m2W7DSlI3";

            // Api controllers with an [Authorize] attribute will be validated with JWT
            app.UseJwtBearerAuthentication(
                new JwtBearerAuthenticationOptions
                {
                    AuthenticationMode = AuthenticationMode.Active,
                    AllowedAudiences = new string[] { audiences },
                    IssuerSecurityKeyProviders = new IIssuerSecurityKeyProvider[]
                    {
                        new  SymmetricKeyIssuerSecurityKeyProvider(issuer, secret)
                    },
                    Provider = new OAuthBearerAuthenticationProvider
                    {
                        OnValidateIdentity = context =>
                        {
                            //context.Ticket.Identity.AddClaim(new System.Security.Claims.Claim("newCustomClaim", "newValue"));
                            return Task.FromResult<object>(null);
                        }
                    }

                });
        }
    }
}