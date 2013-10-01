using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Mid.Tools
{
    public abstract class SerializationTool : ISerializationTool
    {
        public abstract void Serialize(object toSerialize, Stream writeTo);
        public abstract object Deserialize(Type resultType, Stream toDeserialize);


        public string Serialize(object toSerialize)
        {
            using (var ms = new MemoryStream(new byte[1024]))
            {
                Serialize(toSerialize,ms);
                return ConvertStreamToString(ms);
            }
        }

        public object Deserialize<T>(string serializedObject)
        {
            using (var stream = ConvertStringToStream(serializedObject))
            {
                return Deserialize(typeof (T), stream);
            }
        }

        private List<Type> _knownTypes= new List<Type>();
        public List<Type> KnownTypes
        {
            get { return _knownTypes; }
            set { _knownTypes = value; }
        }

        public string ConvertStreamToString(Stream stream)
        {
            stream.Position = 0;
            using (StreamReader reader = new StreamReader(stream))
            {
                return reader.ReadToEnd();
            }            
        }

        public Stream ConvertStringToStream(String str)
        {
            MemoryStream stream = new MemoryStream();
            
            using (StreamWriter writer = new StreamWriter(stream))
            {
                writer.Write(str);
                writer.Flush();
            }
            stream.Position = 0;
            return stream;
        }
    }
}
