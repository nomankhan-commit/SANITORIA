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
    
    public partial class policylist
    {
        public int id { get; set; }
        public Nullable<int> policyid { get; set; }
        public string controller { get; set; }
        public string action { get; set; }
        public string eventAccess { get; set; }
        public Nullable<bool> ispageBlock { get; set; }
        public Nullable<System.DateTime> createAT { get; set; }
        public Nullable<System.DateTime> updateAt { get; set; }
        public string createBy { get; set; }
        public string updateBy { get; set; }
    }
}
