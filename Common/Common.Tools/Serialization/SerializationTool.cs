using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace Common.Tools.Serialization
{
    public abstract class SerializationTool<T> : ISerializationTool<T>
    {
        public abstract void Serialize(T toSerialize, Stream writeTo);

        public abstract T Deserialize(Stream toSerialize);

        public string Serialize(T toSerialize)
        {

            return null;
        }
    }
}
