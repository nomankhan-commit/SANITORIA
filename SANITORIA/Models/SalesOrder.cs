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
    
    public partial class SalesOrder
    {
        public int id { get; set; }
        public string SO_id { get; set; }
        public string SQ_ID { get; set; }
        public int Customer { get; set; }
        public int company { get; set; }
        public string currenty { get; set; }
        public System.DateTime orderDeadLine { get; set; }
        public System.DateTime RecieptDate { get; set; }
        public int DeliverTo { get; set; }
        public string Status { get; set; }
        public Nullable<System.DateTime> createAT { get; set; }
        public Nullable<System.DateTime> updateAt { get; set; }
        public Nullable<int> createBy { get; set; }
        public bool isDeleted { get; set; }
        public Nullable<int> updateBy { get; set; }
    }
}
