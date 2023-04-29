using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace Common
{
    public class Response
    {

        public int status { get; set; }
        public string message { get; set; }
        public object data1 { get; set; }
        public object data2 { get; set; }
        public DataTable data3 { get; set; }
        public string jsonData { get; set; }

    }
}
