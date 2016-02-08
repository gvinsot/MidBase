using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Business.Core.Models
{
    public class Concept
    {
        public EntityPath Id;
        public List<Relation> Relations = new List<Relation>();
        public EntityPath InheritesFrom = null;
        public string DisplayName = null;
        public string Description = "";
        public List<Modification> Modifications = new List<Modification>();
        public List<ConceptPropertyInfo> PropertiesDescriptions = new List<ConceptPropertyInfo>();

        public string ElementDisplayName;
       // DocumentDBCollection Elements;
        public IQueryable<Concept> Elements;
        //TreeNode<ConceptElement> TreeRepresentation = null;
    }
}
