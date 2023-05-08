using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SANITORIA.Models;

namespace SANITORIA.Controllers
{
    [sessionExpire]
    public class PolicyController : Controller
    {
        // GET: Policy
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult New()
        {

           SANITORIA.Models.SessionObj sessionObj = new SANITORIA.Models.SessionObj();
            ViewBag.id = sessionObj.CSession.userData[0].id;
            return View();
        }

        public ActionResult Edit(int id)
        {
            return View();
        }
    }
}