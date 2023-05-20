using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SANITORIA.Models;
using Common;
using System.Data.Entity;

namespace SANITORIA.DAL
{
    public class Product
    {

        SANITORIA_DBEntities db = new SANITORIA_DBEntities();


        #region PRODUCTS

        public Response AddProducts(Models.Product data, List<ProductsVariant_> Pvariants)
        {

            try
            {
                Response response = new Response();

                if (data.pid > 0)
                {

                    var datadb = db.Products.Where(x => x.P_name == data.P_name && x.pid != data.pid).ToList();
                    if (datadb.Count == 0)
                    {

                        var product_ = db.Products.Find(data.pid);
                        product_.P_name = data.P_name;
                        product_.p_des = data.p_des;
                        product_.p_type = data.p_type;
                        product_.p_tax = data.p_tax;
                        product_.invoicingPolicy = data.invoicingPolicy;
                        product_.salesPrice = data.salesPrice;
                        product_.cost = data.cost;
                        product_.total = data.total;
                        product_.category = data.category;
                        product_.brand = data.brand;
                        product_.company = data.company;
                        product_.image = data.image;
                        product_.isActive = data.isActive;
                        product_.updateAt = DateTime.Now;
                        product_.unit = data.unit;
                        product_.subCategory = data.subCategory;
                        db.Entry(product_).State = EntityState.Modified;
                        db.SaveChanges();
                        response.message = "updated successfully.";
                        response.status = 1;
                        response.message = "updated successfully.";
                        response.status = 1;

                    }
                    else
                    {
                        response.status = 2;
                        response.message = "Name already exist.";
                    }


                }
                else
                {

                    var datadb = db.Products.Where(x => x.P_name == data.P_name).ToList();
                    if (datadb.Count == 0)
                    {

                        response.message = "Save successfully.";
                        response.status = 1;
                        data.createAT = DateTime.Now;
                        db.Products.Add(data);
                        db.SaveChanges();

                    }
                    else
                    {
                        response.status = 2;
                        response.message = "Name already exist.";
                    }

                }

               var p = db.ProductsVariant_.Where(x => x.p_id == data.pid).ToList();
                db.ProductsVariant_.RemoveRange(p);
                db.SaveChanges();
                foreach (var item in Pvariants)
                {
                    item.p_id = data.pid;
                    db.ProductsVariant_.Add(item);
                    db.SaveChanges();
                }

                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }
        public Response GetAllProducts()
        {

            try
            {

                Response response = new Response();
                response.data1 =   db.Products.ToList();
                response.status = 1;
                response.message = "Loaded successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }
        public Response GetProductByid(int id)
        {

            try
            {

                Response response = new Response();
                response.data1 = 
                    new { product = db.Products.Find(id), 
                    variants = db.ProductsVariant_.Where(x=>x.p_id==id).ToList()};
                response.status = 1;
                response.message = "Loaded successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }
        public Response GetAllProductVarient()
        {

            try
            {

                Response response = new Response();
                response.data1  = db.ProductsVariant_.ToList();
                response.status = 1;
                response.message = "Loaded successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }

        public Response deleteProduct(int id)
        {

            try
            {
                var dat = db.Products.Find(id);
                db.Products.Remove(dat);
                db.SaveChanges();
                Response response = new Response();
                response.data1 =
                response.status = 1;
                response.message = "Removed successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }

        #endregion

        #region PRODUCTS VARIANTS

        public Response AddVariants(ProductVariant data)
        {

            try
            {
                Response response = new Response();

                if (data.id > 0)
                {

                    var datadb = db.ProductVariants.Where(x => x.VariantName == data.VariantName && x.id != data.id).ToList();
                    if (datadb.Count == 0)
                    {

                        var userdata = db.ProductVariants.Find(data.id);
                        userdata.VariantName = data.VariantName;
                        userdata.isMultiList = data.isMultiList;
                        userdata.values = data.values;
                        db.Entry(userdata).State = EntityState.Modified;
                        db.SaveChanges();
                        response.message = "updated successfully.";
                        response.status = 1;

                    }
                    else
                    {
                        response.status = 2;
                        response.message = "Variant name already exist.";
                    }


                }
                else
                {

                    var datadb = db.ProductVariants.Where(x => x.VariantName == data.VariantName).ToList();
                    if (datadb.Count == 0)
                    {


                        db.ProductVariants.Add(data);
                        db.SaveChanges();
                        response.message = "created successfully.";
                        response.status = 1;

                    }
                    else
                    {
                        response.status = 2;
                        response.message = "Variant name already exist.";
                    }


                }


                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }
        public Response GetAllvariants()
        {

            try
            {

                Response response = new Response();
                response.data1 = db.ProductVariants.ToList();
                response.status = 1;
                response.message = "Loaded successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }
        public Response GetVariantsByid(int id)
        {

            try
            {

                Response response = new Response();
                response.data1 = db.ProductVariants.Find(id);
                response.status = 1;
                response.message = "Loaded successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }
        public Response deleteVariant(int id)
        {

            try
            {
                var dat = db.ProductVariants.Find(id);
                db.ProductVariants.Remove(dat);
                db.SaveChanges();
                Response response = new Response();
                response.data1 =
                response.status = 1;
                response.message = "Removed successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }

        #endregion

        #region PRODUCTS TYPE

        public Response AddTypes(ProductVariant data)
        {

            try
            {
                Response response = new Response();

                if (data.id > 0)
                {

                    var datadb = db.ProductVariants.Where(x => x.VariantName == data.VariantName && x.id != data.id).ToList();
                    if (datadb.Count == 0)
                    {

                        var userdata = db.ProductVariants.Find(data.id);
                        userdata.VariantName = data.VariantName;
                        userdata.isMultiList = data.isMultiList;
                        userdata.values = data.values;
                        db.Entry(userdata).State = EntityState.Modified;
                        db.SaveChanges();
                        response.message = "updated successfully.";
                        response.status = 1;

                    }
                    else
                    {
                        response.status = 2;
                        response.message = "Variant name already exist.";
                    }


                }
                else
                {

                    var datadb = db.ProductVariants.Where(x => x.VariantName == data.VariantName).ToList();
                    if (datadb.Count == 0)
                    {


                        db.ProductVariants.Add(data);
                        db.SaveChanges();
                        response.message = "created successfully.";
                        response.status = 1;

                    }
                    else
                    {
                        response.status = 2;
                        response.message = "Variant name already exist.";
                    }


                }


                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }
        public Response GetAllTypes()
        {

            try
            {

                Response response = new Response();
                response.data1 = db.ProductVariants.ToList();
                response.status = 1;
                response.message = "Loaded successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }
        public Response GetTypeByid(int id)
        {

            try
            {

                Response response = new Response();
                response.data1 = db.ProductVariants.Find(id);
                response.status = 1;
                response.message = "Loaded successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }
        public Response deleteType(int id)
        {

            try
            {
                var dat = db.ProductVariants.Find(id);
                db.ProductVariants.Remove(dat);
                db.SaveChanges();
                Response response = new Response();
                response.data1 =
                response.status = 1;
                response.message = "Removed successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }


        #endregion

        #region PRODUCTS CATEGORY

        public Response AddCategory(ProductsCategory data)
        {

            try
            {
                Response response = new Response();

                if (data.id > 0)
                {

                    var datadb = db.ProductsCategories.Where(x => x.Category == data.Category && x.id != data.id).ToList();
                    if (datadb.Count == 0)
                    {

                        var userdata = db.ProductsCategories.Find(data.id);
                        userdata.Category = data.Category;
                        userdata.CostingMethod = data.CostingMethod;
                        userdata.InventoryValuation = data.InventoryValuation;
                        db.Entry(userdata).State = EntityState.Modified;
                        db.SaveChanges();
                        response.message = "updated successfully.";
                        response.status = 1;

                    }
                    else
                    {
                        response.status = 2;
                        response.message = "Category name already exist.";
                    }


                }
                else
                {

                    var datadb = db.ProductsCategories.Where(x => x.Category == data.Category).ToList();
                    if (datadb.Count == 0)
                    {


                        db.ProductsCategories.Add(data);
                        db.SaveChanges();
                        response.message = "created successfully.";
                        response.status = 1;

                    }
                    else
                    {
                        response.status = 2;
                        response.message = "Category name already exist.";
                    }


                }


                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }
        public Response GetAllCategory()
        {

            try
            {

                Response response = new Response();
                response.data1 = db.ProductsCategories.ToList();
                response.status = 1;
                response.message = "Loaded successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }
        public Response GetCategoryByid(int id)
        {

            try
            {

                Response response = new Response();
                response.data1 = db.ProductsCategories.Find(id);
                response.status = 1;
                response.message = "Loaded successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }
        public Response deleteCategory(int id)
        {

            try
            {
                var dat = db.ProductsCategories.Find(id);
                db.ProductsCategories.Remove(dat);
                db.SaveChanges();
                Response response = new Response();
                response.data1 =
                response.status = 1;
                response.message = "Removed successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }


        #endregion

        #region BRANDS

        public Response Addbrand(Brand data)
        {

            try
            {
                Response response = new Response();

                if (data.id > 0)
                {

                    var datadb = db.Brands.Where(x => x.Brand1 == data.Brand1 && x.id != data.id).ToList();
                    if (datadb.Count == 0)
                    {

                        var userdata = db.Brands.Find(data.id);
                        userdata.Brand1 = data.Brand1;
                      
                        db.Entry(userdata).State = EntityState.Modified;
                        db.SaveChanges();
                        response.message = "updated successfully.";
                        response.status = 1;

                    }
                    else
                    {
                        response.status = 2;
                        response.message = "Category name already exist.";
                    }


                }
                else
                {

                    var datadb = db.Brands.Where(x => x.Brand1 == data.Brand1).ToList();
                    if (datadb.Count == 0)
                    {


                        db.Brands.Add(data);
                        db.SaveChanges();
                        response.message = "created successfully.";
                        response.status = 1;

                    }
                    else
                    {
                        response.status = 2;
                        response.message = "Category name already exist.";
                    }


                }


                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }
        public Response GetAllBrands()
        {

            try
            {

                Response response = new Response();
                response.data1 = db.Brands.ToList();
                response.status = 1;
                response.message = "Loaded successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }
        public Response GetBrandsByid(int id)
        {

            try
            {

                Response response = new Response();
                response.data1 = db.Brands.Find(id);
                response.status = 1;
                response.message = "Loaded successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }
        public Response deleteBrands(int id)
        {

            try
            {
                var dat = db.Brands.Find(id);
                db.Brands.Remove(dat);
                db.SaveChanges();
                Response response = new Response();
                response.data1 =
                response.status = 1;
                response.message = "Removed successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }


        #endregion

        #region COMPANY

        public Response AddCompany(Comapny data)
        {

            try
            {
                Response response = new Response();

                if (data.id > 0)
                {

                    var datadb = db.Comapnies.Where(x => x.Comapny1 == data.Comapny1 && x.id != data.id).ToList();
                    if (datadb.Count == 0)
                    {

                        var userdata = db.Comapnies.Find(data.id);
                        userdata.Comapny1 = data.Comapny1;
                      
                        db.Entry(userdata).State = EntityState.Modified;
                        db.SaveChanges();
                        response.message = "updated successfully.";
                        response.status = 1;

                    }
                    else
                    {
                        response.status = 2;
                        response.message = "Category name already exist.";
                    }


                }
                else
                {

                    var datadb = db.Comapnies.Where(x => x.Comapny1 == data.Comapny1).ToList();
                    if (datadb.Count == 0)
                    {


                        db.Comapnies.Add(data);
                        db.SaveChanges();
                        response.message = "created successfully.";
                        response.status = 1;

                    }
                    else
                    {
                        response.status = 2;
                        response.message = "Category name already exist.";
                    }


                }


                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }
        public Response GetAllCompany()
        {

            try
            {

                Response response = new Response();
                response.data1 = db.Comapnies.ToList();
                response.status = 1;
                response.message = "Loaded successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }
        public Response GetCompanyByid(int id)
        {

            try
            {

                Response response = new Response();
                response.data1 = db.Comapnies.Find(id);
                response.status = 1;
                response.message = "Loaded successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }
        public Response deleteCompany(int id)
        {

            try
            {
                var dat = db.Comapnies.Find(id);
                db.Comapnies.Remove(dat);
                db.SaveChanges();
                Response response = new Response();
                response.data1 =
                response.status = 1;
                response.message = "Removed successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }


        #endregion

    }
}