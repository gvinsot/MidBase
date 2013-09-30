using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OAuth2Provider;
using OAuth2Provider.Response;

namespace WWW.Services.Authentication
{
    /// <summary>
    /// Summary description for OAuthAccessToken
    /// </summary>
    public class OAuthAccessToken : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            try
            {
                var accessToker = new OAuthAccessToken();
                accessToker.ProcessRequest(context);
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