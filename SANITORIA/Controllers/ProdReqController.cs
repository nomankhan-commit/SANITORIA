using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Common;
using SANITORIA.Models;

namespace SANITORIA.Controllers
{
 
    [sessionExpire]
    public class ProdReqController : Controller
    {

        SANITORIA_DBEntities db = new SANITORIA_DBEntities();
        // GET: ProdReq
        public ActionResult Index()
        {
            ViewBag.data = db.PRODUCT_Requisition.ToList();
            ViewBag.statusbtn = false;
            return View();
        }

        public ActionResult Index_()
        {
            ViewBag.data = db.PRODUCT_Requisition.ToList();
            ViewBag.statusbtn = true; 
            return View("Index");
        }

        public ActionResult create()
        {
            ViewBag.inventory = db.Inventory().ToList();
            ViewBag.id = 0;
            ViewBag.view = false;
            return View();
        }
        
        
        [HttpPost]
        public JsonResult create(PRODUCT_Requisition data , List<PRODUCTs_of_Requisition> products)
        {
           

            if (data.id>0)
            {
                var d = db.PRODUCT_Requisition.Where(x => x.id == data.id).FirstOrDefault();
                d.requisitionName = data.requisitionName;
                d.status = data.status;
                d.createAT = DateTime.Now;
                db.Entry(d).State = EntityState.Modified;
                db.SaveChanges();
            }
            else
            {
                db.PRODUCT_Requisition.Add(data);
                db.SaveChanges();
            }

            if (data.id>0)
            {
                var d = db.PRODUCTs_of_Requisition.Where(x => x.Requisitionid == data.id).ToList();
                db.PRODUCTs_of_Requisition.RemoveRange(d);
                db.SaveChanges();
            }

            foreach (var item in products)
            {
                item.Requisitionid = data.id;
                db.PRODUCTs_of_Requisition.Add(item);
                db.SaveChanges();
            }

            db.SaveChanges();
            return Json("1",JsonRequestBehavior.AllowGet);
        }

         [HttpGet]
        public JsonResult status(string status, int id)
        {


            var d = db.PRODUCT_Requisition.Where(x=>x.id == id).FirstOrDefault();
            string msg = "status can not be chaged because itis already "+ d.status+".";
            int type = 2;
            if (d.status=="" || d.status == null)
            {
                d.status = status;
                db.Entry(d).State = EntityState.Modified;
                db.SaveChanges();
                msg = "status chaged to " + status + ".";
                type = 1;
            }

            dynamic dyn = new {msg = msg, type = type };
            return Json(dyn,JsonRequestBehavior.AllowGet);
        }


        public ActionResult edit(int id)
        {
            ViewBag.inventory = db.Inventory().ToList();
            ViewBag.id = id;
            ViewBag.view = false;
            return View("create");
        }
        
        public ActionResult view(int id)
        {
            ViewBag.inventory = db.Inventory().ToList();
            ViewBag.id = id;
            ViewBag.view = true;
            return View("create");
        }

        [HttpPost]
        public JsonResult Edit(int id)
        {


            var d = db.PRODUCT_Requisition.Find(id);
            var productdetails = db.PRODUCTs_of_Requisition.Where(x => x.Requisitionid == id).ToList();
            dynamic dyn = new { data = d, detail = productdetails };
            // ViewBag.data = dyn;
            return Json(dyn, JsonRequestBehavior.AllowGet);
        }

    }
}