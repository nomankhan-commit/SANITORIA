using Common;
using SANITORIA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SANITORIA.Controllers
{
    public class SalesReturnController : Controller
    {
        // GET: SalesReturn

        SANITORIA_DBEntities db = new SANITORIA_DBEntities();
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult salesreturn()
        {
            ViewBag.inventory = db.sp_Inventory().ToList();
            return View();
        }

        [HttpGet]
        public ActionResult salesreturn_(int rid, int qty)
        {
           var rqty = db.RECV_Product.Find(rid).Temp_Rec_Qty;
            int a = 
            return View();
        }



        public ActionResult salesreplaceproduct()
        {
            return View();
        }

        [HttpPost]
        public ActionResult salesreplaceproduct(int id)
        {
            return View();
        }
    }
}