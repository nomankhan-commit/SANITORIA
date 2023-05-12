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


        public JsonResult GetAll()
        {
            return Json(db.Bills.ToList(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult Getbyid(int id)
        {
            return View();
        }
    }
}