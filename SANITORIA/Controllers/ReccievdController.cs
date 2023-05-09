using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Common;
using SANITORIA.Models;

namespace SANITORIA.Controllers
{
    public class ReccievdController : Controller
    {
        // GET: Reccievd
        public ActionResult Index()
        {
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
    }
}