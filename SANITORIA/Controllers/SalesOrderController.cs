using Common;
using SANITORIA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace SANITORIA.Controllers
{
    

    [sessionExpire]
    [SalesRole]
    public class SalesOrderController : Controller
    {
        // GET: PurchaseOrder
        SANITORIA_DBEntities db = new SANITORIA_DBEntities();
        public ActionResult Index()
        {

            DAL.Product prd = new DAL.Product();
            DAL.Vendor v = new DAL.Vendor();
            
            DAL.warehouse warehouse = new DAL.warehouse();
            ViewBag.company = prd.GetAllCompany();
            ViewBag.vendor = v.GetAll();
            ViewBag.warehouse = warehouse.GetAll();
            DAL.Customer c = new DAL.Customer();
            ViewBag.customer = c.GetAll();
            return View();
        }

        public ActionResult Create()
        {

            ViewBag.id = 0;
            DAL.Product prd = new DAL.Product();
            DAL.warehouse warehouse = new DAL.warehouse();

            DAL.Customer c = new DAL.Customer();
            ViewBag.customer = c.GetAll();
            DAL.Vendor v = new DAL.Vendor();
            DAL.Tax_ tax = new DAL.Tax_();
            ViewBag.company = prd.GetAllCompany();
            ViewBag.vendor = v.GetAll();
            ViewBag.varient = prd.GetAllvariants();
            ViewBag.tax = tax.GetAllTax();


            var inv = db.sp_Inventory().ToList();
            List<Product> products = new List<Product>();
            foreach (var item in inv)
            {
                Product product = new Product();
                product.pid = item.id;
                product.P_name = item.id + "-" + item.P_name + "(" + item.varient + ")" + "(" + item.Recid + ")";
                product.p_type = item.p_type;
                //product. = item.p_type;
                products.Add(product);
            }

            //ViewBag.products = prd.GetAllProducts();
            Response response = new Response();
            response.data1 = products;
            response.status = 1;
            response.message = "Loaded successfully.";
            ViewBag.products = response;
            //ViewBag.products = prd.GetAllProducts();


            ViewBag.productvarient = prd.GetAllProductVarient();
            ViewBag.warehouse = warehouse.GetAll();
            ViewBag.inventory = inv;
            return View();

        }

        public ActionResult Edit(int id)
        {

            ViewBag.id = id;
            DAL.Customer c = new DAL.Customer();
            ViewBag.customer = c.GetAll();
            DAL.Product prd = new DAL.Product();
            DAL.Vendor v = new DAL.Vendor();
            DAL.Tax_ tax = new DAL.Tax_();
            DAL.warehouse warehouse = new DAL.warehouse();
            ViewBag.company = prd.GetAllCompany();
            ViewBag.vendor = v.GetAll();
            ViewBag.varient = prd.GetAllvariants();
            ViewBag.tax = tax.GetAllTax();

            var inv = db.sp_Inventory().ToList();
            List<Product> products = new List<Product>();
            foreach (var item in inv)
            {
                Product product = new Product();
                product.pid = item.id;
                product.P_name = item.id + "-" + item.P_name + "(" + item.varient + ")" + "(" + item.Recid + ")";
                product.p_type = item.p_type;
                //product. = item.p_type;
                products.Add(product);
            }

            //ViewBag.products = prd.GetAllProducts();
            Response response = new Response();
            response.data1 = products;
            response.status = 1;
            response.message = "Loaded successfully.";
            ViewBag.products = response;
            //ViewBag.products = prd.GetAllProducts();

            ViewBag.warehouse = warehouse.GetAll();
            ViewBag.productvarient = prd.GetAllProductVarient();
            ViewBag.inventory = inv;
            return View("Create");
        }


        [HttpPost]
        public JsonResult Create(SalesOrder data, List<SalesQuotationProduct> product)
        {

            Response response = new Response();
            DAL.SalesOrder_ po = new DAL.SalesOrder_();
            response = po.Add(data, product);
            return Json(response, JsonRequestBehavior.AllowGet);

        }


        [HttpPost]
        public JsonResult getall()
        {

            Response response = new Response();
            DAL.SalesOrder_ rfq = new DAL.SalesOrder_();
            response = rfq.GetAll();
            return Json(response, JsonRequestBehavior.AllowGet);

        }


        [HttpPost]
        public JsonResult getbyid(int id)
        {

            Response response = new Response();
            DAL.SalesOrder_ rfq = new DAL.SalesOrder_();
            response = rfq.GetByid(id);
            return Json(response, JsonRequestBehavior.AllowGet);

        }


        [HttpPost]
        public JsonResult delete(int id)
        {

            Response response = new Response();
            DAL.PurchaseOrder_ rfq = new DAL.PurchaseOrder_();
            response = rfq.cancel(id);
            return Json(response, JsonRequestBehavior.AllowGet);

        }


        [HttpPost]
        public JsonResult ConformOrder(int id)
        {

            Response response = new Response();
            DAL.SalesOrder_ rfq = new DAL.SalesOrder_();
            response = rfq.conforOrder(id);
            return Json(response, JsonRequestBehavior.AllowGet);

        }
    }

}