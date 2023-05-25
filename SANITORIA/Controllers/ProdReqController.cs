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
            return View();
        }

        public ActionResult create()
        {
            ViewBag.inventory = db.Inventory().ToList();
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
    }
}