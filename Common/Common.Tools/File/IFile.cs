using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;
using Common.Tools.Serialization;

namespace Common.Tools.Files
{
    public interface IFile<T>
    {
        string FileName { get; set; }
        bool FileExists();
        T GetFileContents();
        void WriteFileContents(T fileContents);
    }
}
