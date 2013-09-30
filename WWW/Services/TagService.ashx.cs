using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Managers;

namespace WWW.Services
{
    /// <summary>
    /// Summary description for TagService
    /// </summary>
    public class TagService : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            try
            {
                context.Response.ContentType = "application/json";

                string result = string.Empty;

                switch (context.Request.HttpMethod)
                {
                    case "GET":
                        result = MediaManager.GetMedias(0);
                        break;

                    case "PUT":

                        break;

                    case "POST":

                        break;

                    case "DELETE":

                        break;
                }

                context.Response.Write(result);
            }
            catch (Exception ex)
            {
                context.Response.Write(ex.ToString());
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