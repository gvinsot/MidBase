using System;
using System.IO;
using System.Runtime.Serialization;

namespace Mid.Tools
{
    public class XmlSerializationTool : SerializationTool
    {
        public override void Serialize(object toSerialize, Stream toWrite)
        {
            var serializer = new DataContractSerializer(toSerialize.GetType());

            serializer.WriteObject(toWrite,toSerialize);
        }

        public override object Deserialize(Type resultType, Stream toSerialize)
        {
            var serializer = new DataContractSerializer(resultType);

            return serializer.ReadObject(toSerialize);
        }


    }
}
