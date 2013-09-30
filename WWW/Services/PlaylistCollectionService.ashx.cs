using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WWW.Services
{
    /// <summary>
    /// Summary description for PlaylistCollectionService
    /// </summary>
    public class PlaylistCollectionService : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.Write("Hello World");
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