using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Common;
using SANITORIA.Models;

namespace SANITORIA.Controllers
{
   

    public class SalesReccievdController : Controller
    {
        // GET: Reccievd
        SANITORIA_DBEntities db = new SANITORIA_DBEntities();
        public ActionResult Index()
        {
            DAL.Customer c = new DAL.Customer();
            ViewBag.customer = c.GetAll();
            DAL.Product prd = new DAL.Product();
            DAL.Vendor v = new DAL.Vendor();
            DAL.warehouse warehouse = new DAL.warehouse();
            ViewBag.company = prd.GetAllCompany();
            ViewBag.vendor = v.GetAll();
            ViewBag.warehouse = warehouse.GetAll();
            return View();
        }



        public ActionResult SoReceived(int soid)
        {

            ViewBag.recid = 0;
            ViewBag.poid = soid;
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
            ViewBag.productvarient = prd.GetAllProductVarient();
            ViewBag.warehouse = warehouse.GetAll();
            return View();
        }

        public ActionResult EDIT(int ID)
        {

            ViewBag.recid = ID;
            ViewBag.poid = ID;
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
            ViewBag.productvarient = prd.GetAllProductVarient();
            ViewBag.warehouse = warehouse.GetAll();
            return View("SoReceived");
        }


        [HttpPost]
        public JsonResult Create(SALES_RECEIVED_ORDER data, List<SALES_RECV_Product> product)
        {

            Response response = new Response();
            DAL.SalesReccievd REC = new DAL.SalesReccievd();
            response = REC.Add(data, product);
            
            return Json(response, JsonRequestBehavior.AllowGet);

        }

        public ActionResult loadPoIntoRecv(int poid)
        {

            Response response = new Response();
            DAL.SalesReccievd rec = new DAL.SalesReccievd();
            response = rec.SoReceived(poid);
            return Json(response, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult getall()
        {

            Response response = new Response();
            DAL.SalesReccievd Reccievd = new DAL.SalesReccievd();
            response = Reccievd.GetAll();
            return Json(response, JsonRequestBehavior.AllowGet);

        }


        [HttpPost]
        public JsonResult paybill(SalesBill data)
        {

            Response response = new Response();
            DAL.SalesReccievd Reccievd = new DAL.SalesReccievd();
            response = Reccievd.paybill(data);
            return Json(response, JsonRequestBehavior.AllowGet);

        }


        [HttpPost]
        public JsonResult getbyid(int id)
        {

            Response response = new Response();
            DAL.SalesReccievd Reccievd = new DAL.SalesReccievd();
            response = Reccievd.GetByid(id);
            return Json(response, JsonRequestBehavior.AllowGet);

        }

    }
}

