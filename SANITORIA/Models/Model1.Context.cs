﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class SANITORIA_DBEntities : DbContext
    {
        public SANITORIA_DBEntities()
            : base("name=SANITORIA_DBEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<BankAccoutn> BankAccoutns { get; set; }
        public virtual DbSet<Brand> Brands { get; set; }
        public virtual DbSet<Comapny> Comapnies { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<ProductsCategory> ProductsCategories { get; set; }
        public virtual DbSet<ProductsVariant_> ProductsVariant_ { get; set; }
        public virtual DbSet<ProductVariant> ProductVariants { get; set; }
        public virtual DbSet<RFQ> RFQs { get; set; }
        public virtual DbSet<RfqProduct> RfqProducts { get; set; }
        public virtual DbSet<sysdiagram> sysdiagrams { get; set; }
        public virtual DbSet<Tax> Taxes { get; set; }
        public virtual DbSet<USER> USERS { get; set; }
        public virtual DbSet<vendor> vendors { get; set; }
        public virtual DbSet<warehouse> warehouses { get; set; }
    }
}
