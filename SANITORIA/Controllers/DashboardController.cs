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
    public class DashboardController : Controller
    {
        // GET: Dashboard
        public ActionResult Index()
        {
            SANITORIA_DBEntities db = new SANITORIA_DBEntities();


            ViewBag.products = db.Products.ToList().Count();
            ViewBag.vendors = db.vendors.ToList().Count();
            ViewBag.customers = db.customers.ToList().Count();
            ViewBag.companies = db.Comapnies.ToList().Count();
            
            ViewBag.sp_Inventory = db.sp_Inventory().ToList().Count();
            ViewBag.warehouses = db.warehouses.ToList().Count();
            ViewBag.RFQs = db.RFQs.ToList().Count();
            ViewBag.SalesOrders = db.SalesOrders.ToList().Count();


            return View();
        }
    }
}