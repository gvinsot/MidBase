using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Business.Core.Models
{
    public class ConceptPropertyInfo
    {
        public EntityPath Id;
        public EntityPath ConceptId;
        public string PropertyName;
        public ConceptPropertyType PropertyType;
        public Type ScalarType;
        public List<Relation> Relations;
        public List<Modification> Modifications;
    }
}
