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
    public class CustomerController : Controller
    {
        // GET: Customer
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult New()
        {
            ViewBag.id = 0;
            return View();
        }

        public ActionResult Edit(int id)
        {
            ViewBag.id = id;
            return View("New");
        }


        [HttpPost]
        public ActionResult Create(customer data, List<CustomerBankAccoutn> account)
        {

            try
            {
                Response response = new Response();
                DAL.Customer ven = new DAL.Customer();
                response = ven.Add(data, account);
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
                DAL.Customer ven = new DAL.Customer();
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
                DAL.Customer ven = new DAL.Customer();
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
                DAL.Customer ven = new DAL.Customer();
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