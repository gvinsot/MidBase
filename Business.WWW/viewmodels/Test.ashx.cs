using System;
using System.IO;
using System.Web;
using Mid.Tools;

namespace Business.WWW.ViewModels
{
    /// <summary>
    /// Summary description for Index
    /// </summary>
    public class Test : IHttpHandler
    {
        public class toto
        {
            public string url = "urlvalue";
            public titi sub = new titi();

        }

        public class titi
        {
            public string test = "http://www.google.com";
            public string foo = "test 3";
        }

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

                var result = Factory<ISerializationTool>.New().Serialize(new toto());
                context.Response.Write(result);
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