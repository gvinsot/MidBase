using System;
using System.Collections.Generic;
using System.Linq;

namespace Mid.Tools
{
    public static class Factory<T> where T:class
    {
        public static T New()
        {
            if(typeof(T).Name == "ISerializationTool")
            {
                return new JsonSerializationTool() as T;
            }

            throw new Exception("Type not found : "+typeof(T));
        }
    }
}
