using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Security.Cryptography;

namespace Common.Tools.Hash
{
    public class HashTools : IHash, IDisposable
    {
        private HashAlgorithm _algorithm = null;

        public HashTools(HashAlgorithm algorithm)
        {
            if (algorithm == null)
            {
                throw new ArgumentException("algorithm is null");
            }
            _algorithm = algorithm;
        }

        public string GetHashCode(string toHash)
        {
            if (string.IsNullOrEmpty(toHash))
            {
                throw new ArgumentException("string to hash is empty");
            }

            byte[] byteArray = Encoding.Unicode.GetBytes(toHash);

            string result = this.GetHashCode(byteArray);

            return result;
        }

        public string GetHashCode(System.IO.Stream stream)
        {
            return this.GetHashCode(stream, _algorithm);
        }

        private string GetHashCode(System.IO.Stream stream,HashAlgorithm algorithm)
        {
            try
            {
                byte[] byteResult = algorithm.ComputeHash(stream);
                algorithm.Clear();
                string result = this.CleanUpShaCode(byteResult);
                return result;
            }
            finally
            {
                if (algorithm != null)
                {
                    algorithm.Clear();
                }
            }
        }

        public string GetHashCode(byte[] byteArray)
        {
            if (byteArray == null || byteArray.Length==0)
            {
                throw new ArgumentException("byte array to hash is empty");
            }

            Stream stream = new MemoryStream(byteArray);
            return this.GetHashCode(stream,_algorithm);
        }

        private string CleanUpShaCode(byte[] hashedData)
        {
            String temp;
            StringBuilder returnCode = new StringBuilder();
            for (int i = 0; i < hashedData.Length; i++)
            {
                temp = ((int)hashedData[i]).ToString("X");
                if (temp.Length == 1)
                {
                    temp = temp.Insert(0, "0");
                }
                returnCode.Append(temp);
            }

            string result = returnCode.ToString();

            return result;
        }

        public void Dispose()
        {
            if (_algorithm != null)
            {
                _algorithm.Dispose();
                _algorithm = null;
            }
        }

    }
}
