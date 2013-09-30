using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;
using System.IO;
using System.Runtime.Serialization.Json;

namespace Common.Tools.Serialization
{
    public class JsonSerializationTool<T> : SerializationTool<T>
    {
        public override void Serialize(T toSerialize, Stream toWrite)
        {
            var serializer = new DataContractJsonSerializer(typeof(T));

            serializer.WriteObject(toWrite,toSerialize);
        }

        public override T Deserialize(System.IO.Stream toSerialize)
        {
            var serializer = new DataContractJsonSerializer(typeof(T));

            return (T) serializer.ReadObject(toSerialize);
        }


    }
}
