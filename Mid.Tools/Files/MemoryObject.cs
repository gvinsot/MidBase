using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Mid.Tools
{
    public class MemoryObject<T> : IDataObject<T> where T : class
    {
        private static Dictionary<string, string> _memoryDataSet = new Dictionary<string, string>();

        private ISerializationTool _serializer;
        
        public MemoryObject()
        {
            _serializer = Factory<ISerializationTool>.New();
        }

        public MemoryObject(string fileName)
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
                    if (_memoryDataSet.ContainsKey(_path))
                    {
                        JsonSerializationTool tool = new JsonSerializationTool();

                        _value = tool.Deserialize<T>( _memoryDataSet[_path]) as T;
                    }
                    if (_value == null)
                    {
                        throw new Exception("Object not found :" + _path);
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
             JsonSerializationTool tool=new JsonSerializationTool();

            var newValue = tool.Serialize(_value);
            
            if (_memoryDataSet.ContainsKey(_path))
            {
                _memoryDataSet[_path] = newValue;
            }
            else
            {
                _memoryDataSet.Add(_path,newValue);
            }
        }

        public void Delete()
        {
            if (_memoryDataSet.ContainsKey(_path))
            {
                _memoryDataSet.Remove(_path);
            }
        }
    }
}
