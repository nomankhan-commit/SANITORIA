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
    public class WarehouseController : Controller
    {
        // GET: Warehouse
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult New()
        {
            ViewBag.id = 0;
            return View();
        }


        public ActionResult edit(int id)
        {

            ViewBag.id = id;

            return View("New");
        }


        [HttpPost]
        public ActionResult Create(SANITORIA.Models.warehouse data)
        {

            try
            {
                Response response = new Response();
                DAL.warehouse ven = new DAL.warehouse();
                response = ven.Add(data);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPost]
        public ActionResult getAll()
        {

            try
            {
                Response response = new Response();
                DAL.warehouse ven = new DAL.warehouse();
                response = ven.GetAll();
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPost]
        public ActionResult getbyid(int id)
        {

            try
            {
                Response response = new Response();
                DAL.warehouse ven = new DAL.warehouse();
                response = ven.GetByid(id);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPost]
        public ActionResult delete(int id)
        {

            try
            {
                Response response = new Response();
                DAL.warehouse ven = new DAL.warehouse();
                response = ven.delete(id);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}