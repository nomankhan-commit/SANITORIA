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
    public class PurchaseOrderController : Controller
    {
        // GET: PurchaseOrder
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

        public ActionResult Create()
        {

            ViewBag.id = 0;
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

        public ActionResult Edit(int id)
        {

            ViewBag.id = id;
            DAL.Product prd = new DAL.Product();
            DAL.Vendor v = new DAL.Vendor();
            DAL.Tax_ tax = new DAL.Tax_();
            DAL.warehouse warehouse = new DAL.warehouse();
            ViewBag.company = prd.GetAllCompany();
            ViewBag.vendor = v.GetAll();
            ViewBag.varient = prd.GetAllvariants();
            ViewBag.tax = tax.GetAllTax();
            ViewBag.products = prd.GetAllProducts();
            ViewBag.warehouse = warehouse.GetAll();
            ViewBag.productvarient = prd.GetAllProductVarient();
            return View("Create");
        }


        [HttpPost]
        public JsonResult Create(PurchaseOrder data, List<RfqProduct> product)
        {

            Response response = new Response();
            DAL.PurchaseOrder_ rfq = new DAL.PurchaseOrder_();
            response = rfq.Add(data, product);
            return Json(response, JsonRequestBehavior.AllowGet);

        }


        [HttpPost]
        public JsonResult getall()
        {

            Response response = new Response();
            DAL.PurchaseOrder_ rfq = new DAL.PurchaseOrder_();
            response = rfq.GetAll();
            return Json(response, JsonRequestBehavior.AllowGet);

        }


        [HttpPost]
        public JsonResult getbyid(int id)
        {

            Response response = new Response();
            DAL.PurchaseOrder_ rfq = new DAL.PurchaseOrder_();
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
            DAL.PurchaseOrder_ rfq = new DAL.PurchaseOrder_();
            response = rfq.conforOrder(id);
            return Json(response, JsonRequestBehavior.AllowGet);

        }
    }
}