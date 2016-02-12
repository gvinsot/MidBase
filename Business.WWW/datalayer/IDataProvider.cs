using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WWW.datalayer
{
    interface IDataProvider
    {
        dynamic GetObject(string id);

        List<string> GetObjectIds(string objectType);

        IEnumerable<dynamic> GetObjects(string objectType, long page=1, long nbperpage=long.MaxValue);

        bool SaveObject(dynamic toSave,string id, bool acceptOverwrite=true);

        bool DeleteObject(string id);
    }
}
