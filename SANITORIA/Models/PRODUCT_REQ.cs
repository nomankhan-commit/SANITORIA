//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SANITORIA.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class PRODUCT_REQ
    {
        public int pro_req_id { get; set; }
        public Nullable<int> recvid { get; set; }
        public string product { get; set; }
        public Nullable<int> productid { get; set; }
        public Nullable<int> qty { get; set; }
        public Nullable<System.DateTime> createat { get; set; }
        public Nullable<System.DateTime> updateata { get; set; }
        public Nullable<int> createBy { get; set; }
    }
}
