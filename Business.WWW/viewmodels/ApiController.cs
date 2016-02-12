using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WWW.datalayer;

namespace WWW.viewmodels
{
    public class ApiController : System.Web.Http.ApiController
    {
        IDataProvider DataProvider
        {
            get { return (new FileDataProvider()); }
        }

        // GET: api/Concept
        public IEnumerable<dynamic> Get(string resource, long page=1, long nbperpage=long.MaxValue)
        {
            return DataProvider.GetObjects(resource, page, nbperpage);
        }

        // GET: api/Concept/5
        public dynamic Get(string resource, string id)
        {
            return DataProvider.GetObject($"{resource}/{id}");
        }

        // POST: creates api/Concept
        public dynamic Post([FromBody]dynamic newValue)
        {
           // dynamic newValue = JObject.Parse(value);
            string id = newValue.id.Value;
            //if id == null, generate ?
            DataProvider.SaveObject(newValue,id,false);
            return id;
        }

        // PUT: updates api/Concept/5
        public void Put(string resource, string id, [FromBody]string value)
        {
            dynamic newValue = JObject.Parse(value);
            newValue.id = id;
            DataProvider.SaveObject(newValue, id, true);
        }

        // DELETE: api/Concept/5
        public void Delete(string id)
        {
            DataProvider.DeleteObject(id);
        }
    }
}
