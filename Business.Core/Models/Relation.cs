using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Business.Core.Models
{
    public class Relation
    {
        public Right Rigth;
        //Action Rule

        public ConceptLevel RelationOwnerLevel;
        public EntityPath RelationOwnerPath;
        
        public List<EntityPath> RelationTargets;
    }

    
}
