using System;
using System.Collections.Generic;
using System.IO;

namespace Mid.Tools
{
    public interface ISerializationTool
    {
        List<Type> KnownTypes { get; set; }
        void Serialize(object toSerialize,Stream writeTo);
        object Deserialize(Type resultType, Stream toDeserialize);
        string Serialize(object toSerialize);
        object Deserialize<T>(string serializedObject);
    }
}
