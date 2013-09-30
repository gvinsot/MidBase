using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Managers;

namespace WWW.Services
{
    /// <summary>
    /// Summary description for MediaService
    /// </summary>
    public class MediaService : IHttpHandler
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
                        var mediaId = int.Parse(context.Request.QueryString["MediaId"]);
                        result = MediaManager.GetMediasFromIds(new List<long>{mediaId});
                        break;


                    case "PUT":

                        break;

                    case "POST":
                        throw new Exception("Method POST not used for one item");
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
                return true;
            }
        }
    }
}