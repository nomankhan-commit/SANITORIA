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
    
    public partial class Product
    {
        public int pid { get; set; }
        public string P_name { get; set; }
        public string p_des { get; set; }
        public Nullable<int> p_type { get; set; }
        public string p_tax { get; set; }
        public Nullable<int> invoicingPolicy { get; set; }
        public Nullable<int> salesPrice { get; set; }
        public Nullable<int> cost { get; set; }
        public string total { get; set; }
        public string subCategory { get; set; }
        public string unit { get; set; }
        public Nullable<int> category { get; set; }
        public Nullable<int> brand { get; set; }
        public Nullable<int> company { get; set; }
        public Nullable<System.DateTime> createAT { get; set; }
        public Nullable<System.DateTime> updateAt { get; set; }
        public Nullable<int> createdBy { get; set; }
        public Nullable<int> updatedBy { get; set; }
        public string image { get; set; }
        public Nullable<bool> isActive { get; set; }
    }
}
