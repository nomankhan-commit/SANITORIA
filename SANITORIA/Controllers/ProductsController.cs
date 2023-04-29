using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Common;
using SANITORIA.DAL;
using SANITORIA.Models;

namespace SANITORIA.Controllers
{

    [sessionExpire]
    public class ProductsController : Controller
    {

        #region  PRODUCTS
        // GET: Products
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult New()
        {


            DAL.Product Product = new DAL.Product();
            DAL.Tax_ tx = new DAL.Tax_();
            ViewBag.Variants = Product.GetAllvariants();
            ViewBag.Categories = Product.GetAllCategory();
            ViewBag.Brands = Product.GetAllBrands();
            ViewBag.Company = Product.GetAllCompany();
            ViewBag.tax = tx.GetAllTax();
            ViewBag.id = 0;
            return View();
        }

        public ActionResult Edit(int id)
        {


            DAL.Product Product = new DAL.Product();
            DAL.Tax_ tx = new DAL.Tax_();
            ViewBag.Variants = Product.GetAllvariants();
            ViewBag.Categories = Product.GetAllCategory();
            ViewBag.Brands = Product.GetAllBrands();
            ViewBag.Company = Product.GetAllCompany();
            ViewBag.tax = tx.GetAllTax();
            ViewBag.id = id;
            return View("New");
        }

        public JsonResult createProduct(Models.Product product, List<ProductsVariant_> productsVariant_s)
        {

            Response response = new Response();
            DAL.Product Product = new DAL.Product();
            response = Product.AddProducts(product, productsVariant_s);
            return Json(response, JsonRequestBehavior.AllowGet);

           
        
        }

        [Route("{id}")]
        public JsonResult productsByid(int id)
        {

            Response response = new Response();
            DAL.Product Product = new DAL.Product();
            response = Product.GetProductByid(id);
            return Json(response, JsonRequestBehavior.AllowGet);



        }

        public JsonResult getAllProducts()
        {

            Response response = new Response();
            DAL.Product Product = new DAL.Product();
            response = Product.GetAllProducts();
            return Json(response, JsonRequestBehavior.AllowGet);



        }

        #endregion

        #region PRODUCT VARIANTS 

        public ActionResult productvariants()
        {
            return View();
        }

        public ActionResult addproductvariants()
        {
            return View();
        }
        public ActionResult editproductvariants(int id)
        {

            Response response = new Response();
            DAL.Product Product = new DAL.Product();
            response = Product.GetVariantsByid(id);
            ViewBag.data = response;

            return View("addproductvariants");
        }
        [HttpPost]
        public JsonResult LoadVariants()
        {
            try
            {
                Response response = new Response();
                DAL.Product Product = new DAL.Product();
                response = Product.GetAllvariants();
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }

        }

        [HttpPost]
        public JsonResult addProductvariants(ProductVariant data)
        {

            try
            {
                Response response = new Response();
                DAL.Product Product = new DAL.Product();
                response = Product.AddVariants(data);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPost]
        public JsonResult deleteProductvariants(int id)
        {

            try
            {
                Response response = new Response();
                DAL.Product Product = new DAL.Product();
                response = Product.deleteVariant(id);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion

        #region PRODUCT TYPE

        public ActionResult producType()
        {
            return View();
        }

        public ActionResult addproductType()
        {
            return View();
        }
        public ActionResult editproducType(int id)
        {

            Response response = new Response();
            DAL.Product Product = new DAL.Product();
            response = Product.GetTypeByid(id);
            ViewBag.data = response;

            return View("addproductvariants");
        }
        [HttpPost]
        public JsonResult LoadType()
        {
            try
            {
                Response response = new Response();
                DAL.Product Product = new DAL.Product();
                response = Product.GetAllTypes();
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }

        }

        [HttpPost]
        public JsonResult addProductType(ProductVariant data)
        {

            try
            {
                Response response = new Response();
                DAL.Product Product = new DAL.Product();
                response = Product.AddTypes(data);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPost]
        public JsonResult deleteProductType(int id)
        {

            try
            {
                Response response = new Response();
                DAL.Product Product = new DAL.Product();
                response = Product.deleteType(id);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion

        #region PRODUCT CATEGORY

        public ActionResult producCategory()
        {
            return View();
        }

        public ActionResult addproductCategory()
        {
            return View();
        }
        public ActionResult editproducCategory(int id)
        {

            Response response = new Response();
            DAL.Product Product = new DAL.Product();
            response = Product.GetCategoryByid(id);
            ViewBag.data = response;

            return View("addproductCategory");
        }
        [HttpPost]
        public JsonResult LoadCategory()
        {
            try
            {
                Response response = new Response();
                DAL.Product Product = new DAL.Product();
                response = Product.GetAllCategory();
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }

        }

        [HttpPost]
        public JsonResult addProductCategory(ProductsCategory data)
        {

            try
            {
                Response response = new Response();
                DAL.Product Product = new DAL.Product();
                response = Product.AddCategory(data);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPost]
        public JsonResult deleteProductCategory(int id)
        {

            try
            {
                Response response = new Response();
                DAL.Product Product = new DAL.Product();
                response = Product.deleteCategory(id);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion

        #region BRAND

        public ActionResult producBrand()
        {
            return View();
        }

        public ActionResult addproductBrand()
        {
            return View();
        }
        public ActionResult editproducBrand(int id)
        {

            Response response = new Response();
            DAL.Product Product = new DAL.Product();
            response = Product.GetBrandsByid(id);
            ViewBag.data = response;

            return View("addproductBrand");
        }
        [HttpPost]
        public JsonResult LoadBrand()
        {
            try
            {
                Response response = new Response();
                DAL.Product Product = new DAL.Product();
                response = Product.GetAllBrands();
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }

        }

        [HttpPost]
        public JsonResult addProductBrand(Brand data)
        {

            try
            {
                Response response = new Response();
                DAL.Product Product = new DAL.Product();
                response = Product.Addbrand(data);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPost]
        public JsonResult deleteProductBrand(int id)
        {

            try
            {
                Response response = new Response();
                DAL.Product Product = new DAL.Product();
                response = Product.deleteBrands(id);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion

        #region COMPANY

        public ActionResult producComapny()
        {
            return View();
        }

        public ActionResult addproductComapny()
        {
            return View();
        }
        public ActionResult editproducComapny(int id)
        {

            Response response = new Response();
            DAL.Product Product = new DAL.Product();
            response = Product.GetCompanyByid(id);
            ViewBag.data = response;

            return View("addproductComapny");
        }
        [HttpPost]
        public JsonResult LoadComapny()
        {
            try
            {
                Response response = new Response();
                DAL.Product Product = new DAL.Product();
                response = Product.GetAllCompany();
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }

        }

        [HttpPost]
        public JsonResult addProductComapny(Comapny data)
        {

            try
            {
                Response response = new Response();
                DAL.Product Product = new DAL.Product();
                response = Product.AddCompany(data);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPost]
        public JsonResult deleteProductComapny(int id)
        {

            try
            {
                Response response = new Response();
                DAL.Product Product = new DAL.Product();
                response = Product.deleteCompany(id);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion
    }
}