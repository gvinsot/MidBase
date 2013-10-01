using System;
using System.IO;
using System.Runtime.Serialization.Json;

namespace Mid.Tools
{
    public class JsonSerializationTool : SerializationTool
    {
        public override void Serialize(object toSerialize, Stream toWrite)
        {
            var serializer = new DataContractJsonSerializer(toSerialize.GetType());

            serializer.WriteObject(toWrite,toSerialize);
        }

        public override object Deserialize(Type objectType, Stream toDeserialize)
        {
            var serializer = new DataContractJsonSerializer(objectType);

            return serializer.ReadObject(toDeserialize);
        }


    }
}
