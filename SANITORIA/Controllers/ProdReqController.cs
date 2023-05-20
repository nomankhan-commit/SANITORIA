using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Common;
using SANITORIA.Models;

namespace SANITORIA.Controllers
{
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
        public JsonResult create(PRODUCT_REQ data)
        {
            db.PRODUCT_REQ.Add(data);
            db.SaveChanges();
            return Json("1",JsonRequestBehavior.AllowGet);
        }
    }
}