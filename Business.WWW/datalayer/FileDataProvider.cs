using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace WWW.datalayer
{
    public class FileDataProvider : IDataProvider
    {
        public string rootDataPath = @"D:\tmp";


        public dynamic GetObject(string id)
        {
            string filePath = $"{rootDataPath}\\{id}.json";
            
            string objectString = File.ReadAllText(filePath);

            dynamic result = JObject.Parse(objectString);

            return result;
        }

        public List<string> GetObjectIds(string objectType)
        {
            string filePath = $"{rootDataPath}\\{objectType}.json";

            string fileDir = Path.GetDirectoryName(filePath);

            if (!Directory.Exists(fileDir))
                return null;

            var result = Directory.GetFiles(fileDir).Select(Path.GetFileNameWithoutExtension).ToList();

            return result;
        }

        public bool SaveObject(dynamic toSave,string id, bool acceptOverwrite=true)
        {
            string filePath = $"{rootDataPath}\\{id}.json";

            string fileDir = Path.GetDirectoryName(filePath);
            if (!Directory.Exists(fileDir))
                Directory.CreateDirectory(fileDir);

            File.WriteAllText(filePath, toSave.ToString() as string);
            return true;
        }

        public bool DeleteObject(string id)
        {
            string filePath = $"{rootDataPath}\\{id}.json";

            if (!File.Exists(filePath))
                return false;

            File.Delete(filePath);
            return true;            
        }

        public IEnumerable<dynamic> GetObjects(string objectType, long page, long nbperpage)
        {
            var ids = GetObjectIds(objectType);

            List<dynamic> result = new List<dynamic>();

            long targetCount = nbperpage==long.MaxValue? ids.Count : Math.Min(ids.Count, (page + 1) * nbperpage);


            for (long i= page*nbperpage; i< targetCount; i++)
            {
                result.Add( GetObject(ids[(int)i]));
            }
            return result;
        }
    }
}
