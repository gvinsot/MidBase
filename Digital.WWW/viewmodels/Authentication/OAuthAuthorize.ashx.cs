using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OAuth2Provider;
using OAuth2Provider.Response;

namespace WWW.ViewModels.Authentication
{
    /// <summary>
    /// Summary description for OAuthAuthorize
    /// </summary>
    public class OAuthAuthorize : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            try
            {
                var authorizer = new OAuthAuthorize();
                authorizer.ProcessRequest(context);
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
                return false;
            }
        }
    }
}