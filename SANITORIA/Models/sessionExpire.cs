using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Common;

namespace SANITORIA.Models
{
    public class sessionExpire : ActionFilterAttribute
    {

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            string ActionName = filterContext.ActionDescriptor.ActionName;
            //string ActionName = filterContext.ActionDescriptor.;

            SessionObj session = new SessionObj();
            if (session.CSession == null)
            {
                filterContext.Result = new RedirectResult("~/Login/Index");
            }
            else
            {

                
            }
            //  }
            //  else {

            //  filterContext.Result = new RedirectResult("~/LicenseExpired/Index");

            //}

        }

    }
}