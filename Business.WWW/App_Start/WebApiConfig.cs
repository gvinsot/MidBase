using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace WWW
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "GetApi",
                routeTemplate: "api/{resource}#{page},{nbperpage}",
                defaults: new { controller = "api", page = RouteParameter.Optional, nbperpage = RouteParameter.Optional, }
            );
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{resource}/{*id}",
                defaults: new { controller="api"}
            );
            config.Routes.MapHttpRoute(
                name: "OtherApi",
                routeTemplate: "services/{controller}",
                defaults: new {}
            );
        }
    }
}
