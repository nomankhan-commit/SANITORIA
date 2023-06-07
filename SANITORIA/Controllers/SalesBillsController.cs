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
        public class SalesBillsController : Controller
        {
            // GET: Bills

            SANITORIA_DBEntities db = new SANITORIA_DBEntities();
            public ActionResult Index()
            {



                return View();
            }

            public ActionResult bill(int id)
            {
                ViewBag.id = id;
                return View();
            }

            public JsonResult GetAll()
            {
                return Json(db.SalesBills.ToList(), JsonRequestBehavior.AllowGet);
            }

            public ActionResult Getbyid(int id)
            {

                var bil = db.SalesBills.Find(id);
                var rec = db.SALES_RECEIVED_ORDER.Where(e => e.REC_id == bil.SALES_rec).FirstOrDefault();
                dynamic dyn = new { bill = db.SalesBills.Find(id), details = db.SALES_RECV_Product.Where(x => x.Recid == rec.id).ToList() };
                return Json(dyn, JsonRequestBehavior.AllowGet);
            }
        }


    
}