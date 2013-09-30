using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Common.Tools.Test.Hash;
using Common.Tools.Test.File;

namespace Common.Tools.Test.App
{
    class Program
    {
        static void Main(string[] args)
        {
            //HashTest test = new HashTest();
            //test.TestMethodGetHashCode();

            FileToolTest test = new FileToolTest();
            test.Test();
        }
    }
}
