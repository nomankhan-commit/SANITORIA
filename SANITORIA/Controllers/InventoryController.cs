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
    [InventoryRole]
    public class InventoryController : Controller
    {
        SANITORIA_DBEntities db = new SANITORIA_DBEntities();

        // GET: Inventory
        public ActionResult Index()
        {
           
            return View();
        }
        
        public JsonResult getAll()
        {
            
            return Json(db.sp_Inventory().ToList(), JsonRequestBehavior.AllowGet);
        }
    }
}