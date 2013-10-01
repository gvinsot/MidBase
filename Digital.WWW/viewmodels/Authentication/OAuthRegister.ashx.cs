using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MVC3Sample;
using OAuth2Provider;
using OAuth2Provider.Request;
using OAuth2Provider.Response;

namespace WWW.ViewModels.Authentication
{
    /// <summary>
    /// Summary description for oauth_register
    /// </summary>
    public class OAuthRegister : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            try
            {
                var oauthRegister = new OAuthRegister();
                oauthRegister.ProcessRequest(context);
            }
            catch (OAuthException ex)
            {

                context.Response.Write(new ErrorResponseBuilder(ex).BuildJsonMessage());
            }
        }

        public bool IsReusable
        {
            get
            {
                return true;
            }
        }
    }
}