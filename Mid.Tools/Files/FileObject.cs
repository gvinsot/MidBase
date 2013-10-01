using System;
using System.IO;
using System.Linq;

namespace Mid.Tools
{
    public class FileObject<T> : IDataObject<T> where T : class
    {
        private ISerializationTool _serializer;

        public FileObject()
        {
            _serializer = Factory<ISerializationTool>.New();
        }

        public FileObject(string fileName)
        {
            _path = fileName;
            _serializer = Factory<ISerializationTool>.New();
        }

        private T _value = null;
        public T Value
        {
            get
            {
                if (_value == null)
                {
                    if (File.Exists(_path) == false)
                    {
                        throw new IOException("Not found : " + _path);
                    }

                    using (var fileStream = File.Open(_path, FileMode.Open))
                    {
                        _value = _serializer.Deserialize(typeof(T),fileStream) as T;
                    }
                }
                return _value;
            }
            set { _value = value; }
        }


        private string _path;
        public string Path
        {
            get { return _path; }
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    throw new ArgumentException("Invalid Argument");
                }
                _path = value;
                _value = null;
            }
        }

        public void Push()
        {
            using (var fileStream = File.Open(_path, FileMode.OpenOrCreate))
            {
                _serializer.Serialize(_value, fileStream);
            }
        }


        public void Delete()
        {
            if (File.Exists(_path))
            {
                File.Delete(_path);
            }
        }
    }
}
