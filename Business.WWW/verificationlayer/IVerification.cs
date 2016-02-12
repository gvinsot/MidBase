using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WWW.verificationlayer
{
    interface IVerification
    {
        bool CheckObjectForPut(dynamic toPut);

        
    }
}
