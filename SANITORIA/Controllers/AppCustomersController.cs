using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SANITORIA.Models;

namespace SANITORIA.Controllers
{
    public class AppCustomersController : Controller
    {
        // GET: AppCustomers
        public ActionResult Index()
        {
            SANITORIA_DBEntities db = new SANITORIA_DBEntities();
           ViewBag.data = db.app_customer.ToList();

            return View();
        }
    }
}