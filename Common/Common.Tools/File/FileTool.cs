using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Common.Tools.Serialization;

namespace Common.Tools.Files
{
    public class FileTool<T> : IFile<T>
    {
        private string _fileName;
        private ISerializationTool<T> _serializer;

        public FileTool(string fileName, ISerializationTool<T> serializer)
        {
            _fileName = fileName;
            _serializer = serializer;
        }

        public bool FileExists()
        {
            var exists = File.Exists(_fileName);
            return exists;
        }

        public string FileName
        {
            get { return _fileName; }
            set
            {
                if (InValidFileName(value)) throw new ArgumentException("Invalid Argument");
                _fileName = value;
            }
        }


        public T GetFileContents()
        {
            using (var fileStream = File.Open(_fileName,FileMode.Open))
            {
                return _serializer.Deserialize(fileStream);
            }
        }

        public void WriteFileContents(T fileContents)
        {
            using (var fileStream = File.Open(_fileName, FileMode.OpenOrCreate))
            {
                _serializer.Serialize(fileContents, fileStream);
            }
        }


        private bool InValidFileName(string fileName)
        {
            var inValid = string.IsNullOrEmpty(fileName);
            return inValid;
        }
    }
}
