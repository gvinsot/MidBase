using Mid.Common;
using Mid.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Mid.WebSite.viewmodels
{
    /// <summary>
    /// Summary description for Index
    /// </summary>
    public class Index : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            //context.Request.InputStream
            //if post method
            //then update
            if (context.Request.HttpMethod.ToLower() == "post")
            {
                string serialized = null;
                using (StreamReader sr = new StreamReader(context.Request.InputStream))
                {
                    serialized = Uri.UnescapeDataString(sr.ReadToEnd());
                }
            }
            else if (context.Request.HttpMethod.ToLower() == "get")
            {
                context.Response.DisableKernelCache();
                context.Response.ContentType = "application/json";

                context.Response.Write(ObjectTools.SerializeObjectToJson(new Test(), null));
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