using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Managers;

namespace WWW.ViewModels
{
    /// <summary>
    /// Summary description for MediaCollectionService
    /// </summary>
    public class MediaCollectionService : IHttpHandler
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
                        var workgroupId = int.Parse(context.Request.QueryString["WorkgroupId"]);
                        var pageNumber = 0;
                        var pageSize = 30;
                        int.TryParse(context.Request.QueryString["pageNumber"], out pageNumber);
                        int.TryParse(context.Request.QueryString["pageSize"], out pageSize);
                        result = MediaManager.GetMedias(workgroupId,pageNumber,pageSize);
                        break;


                    case "PUT":
                        throw new Exception("Cannot override a media collection");
                        break;

                    case "POST":
                        //create new media

                        break;

                    case "DELETE":
                        throw new Exception("Cannot delete all media collection");
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