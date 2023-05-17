using Common;
using SANITORIA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SANITORIA.Controllers
{
    public class BillsController : Controller
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
            return Json(db.Bills.ToList(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult Getbyid(int id)
        {

           var bil = db.Bills.Find(id);
           var rec = db.RECEIVED_ORDER.Where(e => e.REC_id == bil.rec).FirstOrDefault();
           dynamic dyn = new {bill= db.Bills.Find(id), details = db.RECV_Product.Where(x=>x.Recid == rec.id).ToList() };
           return Json(dyn, JsonRequestBehavior.AllowGet);
        }
    }
}