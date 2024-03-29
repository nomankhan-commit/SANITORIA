﻿using System;
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
    [PurchaseRole]
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
            ViewBag.inventory = db.sp_Inventory().ToList();
            ViewBag.id = 0;
            ViewBag.view = false;
            return View();
        }
        
        
        [HttpPost]
        public JsonResult create(PRODUCT_Requisition data , List<PRODUCTs_of_Requisition> products)
        {

            dynamic dyn;
            if (data.id > 0)
            {

                var datadb = db.PRODUCT_Requisition.Where(x => x.requisitionName == data.requisitionName && x.id != data.id).ToList();

                

                if (datadb.Count == 0)
                {

                    var d = db.PRODUCT_Requisition.Where(x => x.id == data.id).FirstOrDefault();
                    d.requisitionName = data.requisitionName;

                   

                    d.createAT = DateTime.Now;
                    db.Entry(d).State = EntityState.Modified;
                    db.SaveChanges();

                }
                else
                {
                    dyn = new { status = 2, message = "name already exist." };
                    return Json(dyn, JsonRequestBehavior.AllowGet);
                }

               
            }
            else
            {

                

                var datadb = db.PRODUCT_Requisition.Where(x => x.requisitionName == data.requisitionName).ToList();
                if (datadb.Count == 0)
                {

                    data.status = "inprogress";
                    data.createAT = DateTime.Now;
                    db.PRODUCT_Requisition.Add(data);
                    db.SaveChanges();

                }
                else
                {
                    dyn = new { status = 2, message = "name already exist." };
                    return Json(dyn, JsonRequestBehavior.AllowGet);
                }
                
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
            dyn = new { status = 1, message = "save successfully." };
            return Json(dyn,JsonRequestBehavior.AllowGet);
        }

         [HttpGet]
        public JsonResult status(string status, int id)
        {


            var d = db.PRODUCT_Requisition.Where(x=>x.id == id).FirstOrDefault();
            string msg = "status can not be chaged because itis already "+ d.status+".";
            int type = 2;
            if (d.status=="" || d.status == null || d.status == "inprogress")
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
            ViewBag.inventory = db.sp_Inventory().ToList();
            ViewBag.id = id;
            ViewBag.view = false;
            return View("create");
        }
        
        public ActionResult view(int id)
        {
            ViewBag.inventory = db.sp_Inventory().ToList();
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