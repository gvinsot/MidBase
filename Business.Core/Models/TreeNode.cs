using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Core.Models
{
    public class TreeNode<T>
    {
        public TreeNode<T> Parent;
        public List<TreeNode<T>> Children;
        public bool IsEnd = false;
        public T Value;
    }
}
