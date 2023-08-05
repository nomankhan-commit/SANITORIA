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
    [PurchaseRole]
    public class ReccievdController : Controller
    {
        // GET: Reccievd
        public ActionResult Index()
        {

            DAL.Product prd = new DAL.Product();
            DAL.Vendor v = new DAL.Vendor();
            DAL.warehouse warehouse = new DAL.warehouse();
            ViewBag.company = prd.GetAllCompany();
            ViewBag.vendor = v.GetAll();
            ViewBag.warehouse = warehouse.GetAll();
            return View();
        }
        
       
        
        public ActionResult PoReceived(int poid)
        {

            ViewBag.recid = 0;
            ViewBag.poid = poid;
            DAL.Product prd = new DAL.Product();
            DAL.warehouse warehouse = new DAL.warehouse();

            DAL.Vendor v = new DAL.Vendor();
            DAL.Tax_ tax = new DAL.Tax_();
            ViewBag.company = prd.GetAllCompany();
            ViewBag.vendor = v.GetAll();
            ViewBag.varient = prd.GetAllvariants();
            ViewBag.tax = tax.GetAllTax();
            ViewBag.products = prd.GetAllProducts();
            ViewBag.productvarient = prd.GetAllProductVarient();
            ViewBag.warehouse = warehouse.GetAll();
            return View();
        }

        public ActionResult EDIT(int ID )
        {

            ViewBag.recid = ID;
            ViewBag.poid = ID;
            DAL.Product prd = new DAL.Product();
            DAL.warehouse warehouse = new DAL.warehouse();

            DAL.Vendor v = new DAL.Vendor();
            DAL.Tax_ tax = new DAL.Tax_();
            ViewBag.company = prd.GetAllCompany();
            ViewBag.vendor = v.GetAll();
            ViewBag.varient = prd.GetAllvariants();
            ViewBag.tax = tax.GetAllTax();
            ViewBag.products = prd.GetAllProducts();
            ViewBag.productvarient = prd.GetAllProductVarient();
            ViewBag.warehouse = warehouse.GetAll();
            return View("PoReceived");
        }


        [HttpPost]
        public JsonResult Create(RECEIVED_ORDER data, List<RECV_Product> product)
        {

            Response response = new Response();
            DAL.Reccievd REC = new DAL.Reccievd();
            response = REC.Add(data, product);
            return Json(response, JsonRequestBehavior.AllowGet);

        }

        public ActionResult loadPoIntoRecv(int poid)
        {

            Response response = new Response();
            DAL.Reccievd rec = new DAL.Reccievd();
            response = rec.PoReceived(poid);
            return Json(response, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult getall()
        {

            Response response = new Response();
            DAL.Reccievd Reccievd = new DAL.Reccievd();
            response = Reccievd.GetAll();
            return Json(response, JsonRequestBehavior.AllowGet);

        }
        
        
        [HttpPost]
        public JsonResult paybill(Bill data)
        {

            Response response = new Response();
            DAL.Reccievd Reccievd = new DAL.Reccievd();
            response = Reccievd.paybill(data);
            return Json(response, JsonRequestBehavior.AllowGet);

        }


        [HttpPost]
        public JsonResult getbyid(int id)
        {

            Response response = new Response();
            DAL.Reccievd Reccievd = new DAL.Reccievd();
            response = Reccievd.GetByid(id);
            return Json(response, JsonRequestBehavior.AllowGet);

        }

    }
}