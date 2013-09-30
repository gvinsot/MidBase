using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Common.Tools.Hash;
using System.Diagnostics;
using System.Security.Cryptography;

namespace Common.Tools.Test.Hash
{
    public class HashTest
    {
        public void TestMethodGetHashCode()
        {
            IHash hashToTest = new HashTools(SHA256.Create());
            
            string result = hashToTest.GetHashCode("Toto");

            if (result ==  "29808E1E493C7B9903F2BB94EA5ABE57ED8B35E38D247C271AFDDFE227CCC3E8")
            {
                //test success
            }
            else
            {
                //test fails
            }
        }

        public void TestMethodGetHashCodeWithEmptyArgs()
        {
            IHash hashToTest = new HashTools(SHA256.Create());

            try
            {
                hashToTest.GetHashCode("");

                //test fails
            }
            catch(ArgumentException ex)
            {
                //test successfull
            }
            catch (Exception ex)
            {
                //test fails
            }
        }

    }
}
