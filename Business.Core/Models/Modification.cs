using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Core.Models
{
    public class Modification
    {
        public DateTime Time;
        public EntityPath Modificator;
        public ConceptProperty OldValue;
        public ConceptProperty NewValue;
    }
}
