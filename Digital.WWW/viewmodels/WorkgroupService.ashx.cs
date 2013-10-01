using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WWW.ViewModels
{
    /// <summary>
    /// Summary description for WorkgroupService
    /// </summary>
    public class WorkgroupService : IHttpHandler
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