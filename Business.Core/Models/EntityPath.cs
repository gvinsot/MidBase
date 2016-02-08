using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Core.Models
{
    public class EntityPath
    {
        public string Folder;
        public Guid Id;
        public string Path { get { return Folder + "/" + Id; } }
        
        public EntityPath(string folder)
        {
            //todo : check Guid is not in use
            Id = Guid.NewGuid();
            Folder = folder;            
        }
    }
}
