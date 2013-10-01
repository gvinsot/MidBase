using System;
using System.IO;
using System.Web;
using Mid.Tools;

namespace WWW.ViewModels
{
    /// <summary>
    /// Summary description for Index
    /// </summary>
    public class Test : IHttpHandler
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

                context.Response.Write(Factory<ISerializationTool>.New().Serialize(new Test()));
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