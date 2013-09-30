using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Common.Tools.Files;
using Common.Tools.Serialization;

namespace Common.Tools.Test.File
{
    public class FileToolTest
    {
        public class Toto
        {
            public string Nom;
            public string Adresse;
            public int Age;
        }

        public void Test()
        {
            var serializer = new JsonSerializationTool<Toto>();
            var fileTool = new FileTool<Toto>(@"d:\toto.xml", serializer);

            var myToto = new Toto()
            {
                Nom="toto",
                Adresse="totoland",
                Age=42
            };

            fileTool.WriteFileContents(myToto);
        }
    }
}
