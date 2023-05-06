using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Common;
using SANITORIA.Models;

namespace SANITORIA.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login



        public ActionResult Index()
        {
            return View();
        }

        public ActionResult loginAttempt(string username, string password)
        {
            SANITORIA_DBEntities db = new SANITORIA_DBEntities();

            Response ajaxResponse = new Response();

            object dbResult_ = db.USERS.Where(x => x.password == password && x.email == username).ToList();
            var dbResult = db.USERS.Where(x => x.password == password && x.email == username).ToList();
            if (dbResult.Count > 0)
            {
                var pid = dbResult[0].policyid;
                var ppid = pid ?? 0;
                //var securityPolicy = db.securityPolicies.Where(x => x.id == ppid).ToList();
               // var policylist = db.policylists.Where(x => x.policyid == ppid).ToList();
                SessionObj sessionObj = new SessionObj();
                sessionDetails sd = new sessionDetails();
                sd.userid = dbResult[0].id;
                sd.userData = dbResult;
                //sd.securityPolicy = securityPolicy;
                //sd.policylist = policylist;

                sessionObj.CSession = sd;
                //sessionDetails ssd = (sessionDetails)sessionObj.CSession;
                ajaxResponse.status = 1;
                ajaxResponse.message = "Login Successfull";
                ajaxResponse.data1 = sessionObj;
                return Json(ajaxResponse, JsonRequestBehavior.AllowGet);
            }
            else
            {
                ajaxResponse.status = 2;
                ajaxResponse.message = "Login Faild";

                return Json(ajaxResponse, JsonRequestBehavior.AllowGet);
            }


        }

        public ActionResult Logout()
        {
           
                Session.RemoveAll();
                Session.Abandon();

                return RedirectToAction("Index", "Login");
            
           

        }

        public JsonResult checkSession()
        {
            var isSessionAlive = true;
            if (Session["Fin_Session"] == null)
            {
                isSessionAlive = false;
            }

            dynamic dyn = new { isSessionAlive = isSessionAlive };

            return Json(dyn, JsonRequestBehavior.AllowGet);

        }


    }
}