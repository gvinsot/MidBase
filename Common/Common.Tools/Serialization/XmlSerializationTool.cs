using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;
using System.IO;

namespace Common.Tools.Serialization
{
    public class XmlSerializationTool<T> : SerializationTool<T>
    {
        public override void Serialize(T toSerialize, Stream toWrite)
        {
            var serializer = new DataContractSerializer(typeof(T));

            serializer.WriteObject(toWrite,toSerialize);
        }

        public override T Deserialize(System.IO.Stream toSerialize)
        {
            var serializer = new DataContractSerializer(typeof(T));

            return (T) serializer.ReadObject(toSerialize);
        }


    }
}
