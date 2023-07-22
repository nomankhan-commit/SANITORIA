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
    [sessionExpire]
    public class ProductReturnController : Controller
    {
        // GET: productReturn

        SANITORIA_DBEntities db = new SANITORIA_DBEntities();
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult purchasereturn()
        {
            ViewBag.inventory = db.sp_Inventory().ToList();
            ViewBag.invoice = db.Bills.Where(x => x.ParentBill == null).ToList();
            return View();
        }

        [HttpGet]
        public JsonResult productreturn_(int rid, int qty, string invoice)
        {
            var onhand = db.RECV_Product.Find(rid).Temp_Rec_Qty;
            var rqty = db.RECV_Product.Find(rid).REC_qty;

            if (onhand > rqty)
            {
                return Json(new { status = 2, message = "please add valid QTY." }, JsonRequestBehavior.AllowGet);
            }

            if (qty > onhand)
            {

                return Json(new { status = 2, message = "please add valid QTY." }, JsonRequestBehavior.AllowGet);
            }
            else
            {

                //db.productReturn(rid, rqty);
                //db.SaveChanges();

                var recp = db.RECV_Product.Where(x => x.id == rid).FirstOrDefault();
                var f = recp.Temp_Rec_Qty - qty;

                if (f > rqty)
                {
                    return Json(new { status = 2, message = "please add valid QTY." }, JsonRequestBehavior.AllowGet);
                }

                recp.Temp_Rec_Qty = f;
                db.Entry(recp).State = EntityState.Modified;
                db.SaveChanges();



                Bill productBill = new Bill();
                productBill.ParentBill = invoice;
                productBill.createat = DateTime.Now;
                productBill.Rec_Prod_ID = "RecID : " + recp.Recid + ", RecPdtID : " + rid.ToString();
                db.Bills.Add(productBill);
                db.SaveChanges();

                return Json(new { status = 1, message = "inventory updated." }, JsonRequestBehavior.AllowGet);
            }
        }



        public ActionResult productreplaceproduct()
        {
            return View();
        }

        [HttpPost]
        public ActionResult productreplaceproduct(int id)
        {
            return View();
        }
    }
}