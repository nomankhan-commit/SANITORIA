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

        SANITORIA_DBEntities db = new SANITORIA_DBEntities();
        // GET: Dashboard
        public ActionResult Index()
        {
            
            ViewBag.products = db.Products.ToList().Count();
            ViewBag.vendors = db.vendors.ToList().Count();
            ViewBag.customers = db.customers.ToList().Count();
            ViewBag.companies = db.Comapnies.ToList().Count();
            
            ViewBag.sp_Inventory = db.sp_Inventory().ToList().Count();
            ViewBag.warehouses = db.warehouses.ToList().Count();
            ViewBag.RFQs = db.RFQs.ToList().Count();
            ViewBag.SalesOrders = db.SalesOrders.ToList().Count();

            ViewBag.produtctVTotal = db.sp_Inventory().Select(x => new {Product = x.P_name, total = x.subtotal}).ToList();
            ViewBag.produtctVOnHand = db.sp_Inventory().Select(x => new {Product = x.P_name, OnHand = x.Temp_Rec_Qty}).ToList();
            
            ViewBag.ActiveCompany = db.sp_ActiveCompany().ToList();
            ViewBag.ActiveCustomer = db.sp_ActiveCustomer().ToList();
            ViewBag.ActiveWherehouse = db.sp_ActiveWherehouse().ToList();
            ViewBag.SALES = db.sp_SALES().ToList();

            ViewBag.SalesData = salesBind();

            return View();
        }

        public JsonResult getAll()
        {

            return Json(db.sp_Inventory().ToList(), JsonRequestBehavior.AllowGet);
        }


        public JsonResult filter(DateTime date1, DateTime date2)
        {

          //var d = salesBind().Where(x=>x.createDate >= date1 && x.createDate <= date2).ToList();

            return Json("", JsonRequestBehavior.AllowGet);
        }


        public List<SalesData> salesBind() {

            List<SalesData> salesDatas = new List<SalesData>();

            foreach (var item in db.sp_SalesData().ToList())
            {
                SalesData salesData = new SalesData();
                salesData.Amount = item.subtotal;
                salesData.Products = item.P_name;
                salesData.Customer = item.Name;
                salesData.createDate = Convert.ToDateTime(item.createAT).ToShortDateString();
                salesDatas.Add(salesData);
            }

            return salesDatas;

        }

    }


   public class SalesData {

        public string Products { get; set; }
        public string Customer { get; set; }
        public string Amount { get; set; }
        public string createDate{ get; set; }

    }
}