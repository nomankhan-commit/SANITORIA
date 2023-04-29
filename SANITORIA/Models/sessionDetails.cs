using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SANITORIA.Models;

namespace SANITORIA.Models
{
    public class sessionDetails
    {
        public int userid { get; set; }
        public List<USER> userData { get; set; }

        //public List<securityPolicy> securityPolicy { get; set; }
        //public List<policylist> policylist { get; set; }
    }
}