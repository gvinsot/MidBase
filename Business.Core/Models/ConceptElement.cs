using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Core.Models
{
    public class ConceptElement
    {
        public EntityPath Id;
        public EntityPath ConceptId;
        public List<Modification> Modifications;
        public Dictionary<string,ConceptProperty> Properties;
        public List<Relation> Relations;
    }
}
