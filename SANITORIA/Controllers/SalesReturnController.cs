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
            ViewBag.inventory = db.Inventory().ToList();
            return View();
        }

        [HttpPost]
        public ActionResult salesreturn(int rid, int qty)
        {
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