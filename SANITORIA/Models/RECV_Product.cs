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
    
    public partial class RECV_Product
    {
        public int id { get; set; }
        public Nullable<int> Recid { get; set; }
        public Nullable<int> po_id { get; set; }
        public int product { get; set; }
        public string varient { get; set; }
        public int qty { get; set; }
        public int REC_qty { get; set; }
        public int unitprice { get; set; }
        public string taxes { get; set; }
        public string subtotal { get; set; }
    }
}
