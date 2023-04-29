using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SANITORIA.Models;
using SANITORIA.DAL;
using Common;

namespace SANITORIA.Controllers
{

    [sessionExpire]
    public class TaxController : Controller
    {
        // GET: Tax
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Create()
        {
            return View();
        }

        public ActionResult Edit(int id)
        {
            Response response = new Response();
            DAL.Tax_ Tax = new DAL.Tax_();
            ViewBag.data = Tax.GetTaxByid(id);
            return View("Create");
        }

        [HttpPost]
        public ActionResult Create(Tax data)
        {

            try
            {
                Response response = new Response();
                DAL.Tax_ Tax = new DAL.Tax_();
                response = Tax.Addtax(data);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }
        }
        
        [HttpPost]
        public ActionResult LoadTaxes()
        {

            try
            {
                Response response = new Response();
                DAL.Tax_ Tax = new DAL.Tax_();
                response = Tax.GetAllTax();
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
                DAL.Tax_ Tax = new DAL.Tax_();
                response = Tax.GetTaxByid(id);
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
                DAL.Tax_ Tax = new DAL.Tax_();
                response = Tax.deleteTax(id);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}