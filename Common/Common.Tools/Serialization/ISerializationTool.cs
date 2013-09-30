using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace Common.Tools.Serialization
{
    public interface ISerializationTool<T>
    {
        void Serialize(T toSerialize,Stream writeTo);
        T Deserialize(Stream toDeserialize);
    }
}
