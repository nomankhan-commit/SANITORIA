using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Common;
using SANITORIA.Models;
using SANITORIA.DAL;

namespace SANITORIA.Controllers
{

    [sessionExpire]
    [AdminOnly]
    public class UsersController : Controller
    {
        SANITORIA_DBEntities db = new SANITORIA_DBEntities();
        // GET: Users
        public ActionResult Index()
        {
           
            return View();
        }

        [HttpPost]
        public JsonResult LoadUsers()
        {
            try
            {
                Response response = new Response();
                UserAccess userAccess = new UserAccess();
                response = userAccess.GetAllUser();
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }

        }
        public ActionResult New()
        {
            ViewBag.user = null;
            return View();
        }

        [HttpPost]
        public JsonResult New_(USER data)
        {
            try
            {
                UserAccess userAccess = new UserAccess();
                Response response = new Response();
                response = userAccess.AddUser(data);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }
          
        }
        //

        [HttpPost]
        public JsonResult CheckEmail(USER data)
        {
            try
            {
                UserAccess userAccess = new UserAccess();
                Response response = new Response();
                response = userAccess.checkemail(data);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }

        }

        public ActionResult Edit(int id)
        {

            UserAccess userAccess = new UserAccess();
            ViewBag.user = userAccess.GetUserByid(id);
            return View("New");
        }

        [HttpPost]
        public ActionResult Edit(USER data)
        {
            try
            {
                UserAccess userAccess = new UserAccess();
                Response response = new Response();
                response = userAccess.AddUser(data);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            try
            {
                UserAccess userAccess = new UserAccess();
                Response response = new Response();
                response = userAccess.deleteUser(id);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}