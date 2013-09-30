using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace Common.Tools.Hash
{
    public interface IHash
    {
        string GetHashCode(Stream inputStream);

        string GetHashCode(string inputStream);

        string GetHashCode(byte[] inputStream);
    }
}
