using Common;
using SANITORIA.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
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
        public JsonResult salesreturn_(int rid, int qty)
        {
           var onhand = db.RECV_Product.Find(rid).Temp_Rec_Qty;
           var rqty = db.RECV_Product.Find(rid).Temp_Rec_Qty;

            if (onhand >= rqty)
            {
                return Json(new { status = 2, message = "please add valid QTY." }, JsonRequestBehavior.AllowGet);
            }

            if (qty >= onhand)
            {

                return Json(new { status=2, message = "please add valid QTY." }, JsonRequestBehavior.AllowGet);
            }
            else
            {

                //db.salesReturn(rid, rqty);
                //db.SaveChanges();

                var recp = db.RECV_Product.Where(x => x.id == rid).FirstOrDefault();
                var f = recp.Temp_Rec_Qty + qty;

                if (f > rqty)
                {
                    return Json(new { status = 2, message = "please add valid QTY." }, JsonRequestBehavior.AllowGet);
                }

                recp.Temp_Rec_Qty = f;
                db.Entry(recp).State = EntityState.Modified;
                db.SaveChanges();

                return Json(new { status = 1, message = "inventory updated." }, JsonRequestBehavior.AllowGet);
            }


            
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