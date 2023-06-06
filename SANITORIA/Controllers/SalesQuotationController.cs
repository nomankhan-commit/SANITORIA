using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Common;
using SANITORIA.Models;

namespace SANITORIA.Controllers
{
    [sessionExpire]
    public class SalesQuotationController : Controller
    {
        // GET: SalesQuotation

        SANITORIA_DBEntities db = new SANITORIA_DBEntities();
        // GET: salesquotation
        public ActionResult Index()
            {

                DAL.Product prd = new DAL.Product();
                DAL.Vendor v = new DAL.Vendor();
                DAL.Customer c = new DAL.Customer();
                DAL.warehouse warehouse = new DAL.warehouse();
                ViewBag.company = prd.GetAllCompany();
                ViewBag.vendor = v.GetAll();
                ViewBag.customer = c.GetAll();
                ViewBag.warehouse = warehouse.GetAll();
                return View();
            }

            public ActionResult Create()
            {


                
                ViewBag.id = 0;
                DAL.Product prd = new DAL.Product();
                DAL.warehouse warehouse = new DAL.warehouse();
                var inv = db.Inventory().ToList();
                DAL.Vendor v = new DAL.Vendor();
                DAL.Customer c = new DAL.Customer();
                DAL.Tax_ tax = new DAL.Tax_();
                ViewBag.company = prd.GetAllCompany();
                ViewBag.vendor = v.GetAll();
                ViewBag.customer = c.GetAll();
                ViewBag.varient = prd.GetAllvariants();
                ViewBag.tax = tax.GetAllTax();

            List<Product> products = new List<Product>();
            foreach (var item in inv)
            {
                Product product = new Product();
                product.pid = item.pid;
                product.P_name =  item.id + "-" + item.P_name + "(" + item.varient + ")" + "(" + item.Recid + ")";
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

            ViewBag.productvarient = prd.GetAllProductVarient();
                ViewBag.warehouse = warehouse.GetAll();
                return View();

            }

            public ActionResult Edit(int id)
            {

                ViewBag.id = id;
            DAL.Customer c = new DAL.Customer();
            DAL.Product prd = new DAL.Product();
                DAL.Vendor v = new DAL.Vendor();
                DAL.Tax_ tax = new DAL.Tax_();
                DAL.warehouse warehouse = new DAL.warehouse();
                ViewBag.company = prd.GetAllCompany();
                ViewBag.vendor = v.GetAll();
                ViewBag.varient = prd.GetAllvariants();
                ViewBag.tax = tax.GetAllTax();

            var inv = db.Inventory().ToList();
            List<Product> products = new List<Product>();
            foreach (var item in inv)
            {
                Product product = new Product();
                product.pid = item.pid;
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
            ViewBag.customer = c.GetAll();
            ViewBag.productvarient = prd.GetAllProductVarient();
                return View("Create");
            }


            [HttpPost]
            public JsonResult Create(SalesQuotation data, List<SalesQuotationProduct> product)
            {

                Response response = new Response();
                DAL.SalesQuotation salesquotation = new DAL.SalesQuotation();
                response = salesquotation.Add(data, product);
                return Json(response, JsonRequestBehavior.AllowGet);

            }


            [HttpPost]
            public JsonResult getall()
            {

                Response response = new Response();
                DAL.SalesQuotation salesquotation = new DAL.SalesQuotation();
                response = salesquotation.GetAll();
                return Json(response, JsonRequestBehavior.AllowGet);

            }


            [HttpPost]
            public JsonResult getbyid(int id)
            {

                Response response = new Response();
                DAL.SalesQuotation salesquotation = new DAL.SalesQuotation();
                response = salesquotation.GetByid(id);
                return Json(response, JsonRequestBehavior.AllowGet);

            }


            [HttpPost]
            public JsonResult delete(int id)
            {

                Response response = new Response();
                DAL.SalesQuotation salesquotation = new DAL.SalesQuotation();
                response = salesquotation.cancel(id);
                return Json(response, JsonRequestBehavior.AllowGet);

            }


            [HttpPost]
            public JsonResult ConformOrder(int id)
            {

                Response response = new Response();
                DAL.SalesQuotation salesquotation = new DAL.SalesQuotation();
                response = salesquotation.conforOrder(id);
                return Json(response, JsonRequestBehavior.AllowGet);

            }


            [HttpPost]

            public JsonResult Email(string salesquotationid)
            {

                EmailController emailController = new EmailController();
                bool send = emailController.Email("sub", "rec", "msg");
                Response response = new Response();
                response.status = 1;
                response.message = "Email send successfully.";
                if (!send)
                {
                    response.status = 2;
                    response.message = "Email did not send.";
                }
                return Json(response, JsonRequestBehavior.AllowGet);

            }

        
    }
}