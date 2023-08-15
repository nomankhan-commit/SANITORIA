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
    [sessionExpire]
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


    public class PurchaseRole : ActionFilterAttribute
    {

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            string ActionName = filterContext.ActionDescriptor.ActionName;
            //string ActionName = filterContext.ActionDescriptor.;
            SessionObj session = new SessionObj();

            bool admin = session.CSession.userData[0].Admin == null
                            ? false : (bool)session.CSession.userData[0].Admin;

            string userrole = session.CSession.userData[0].UserRoles;

            if (session.CSession == null)
            {
                filterContext.Result = new RedirectResult("~/Login/Index");
            } 
           
            else if (userrole != "purchase")
            {
                if (!admin)
                {
                    filterContext.Result = new RedirectResult("~/Accessdenied/Index");
                }
              

            }

           


            //  }
            //  else {

            //  filterContext.Result = new RedirectResult("~/LicenseExpired/Index");

            //}

        }

    }


    public class SalesRole : ActionFilterAttribute
    {

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            string ActionName = filterContext.ActionDescriptor.ActionName;
            //string ActionName = filterContext.ActionDescriptor.;
            SessionObj session = new SessionObj();

            bool admin = session.CSession.userData[0].Admin == null
                            ? false : (bool)session.CSession.userData[0].Admin;

            string userrole = session.CSession.userData[0].UserRoles;

            if (session.CSession == null)
            {
                filterContext.Result = new RedirectResult("~/Login/Index");
            }
            else if (userrole != "sales")
            {

                if (!admin)
                {
                    filterContext.Result = new RedirectResult("~/Accessdenied/Index");
                }
              
            }

            //  }
            //  else {

            //  filterContext.Result = new RedirectResult("~/LicenseExpired/Index");

            //}

        }

    }


    public class InventoryRole : ActionFilterAttribute
    {

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            string ActionName = filterContext.ActionDescriptor.ActionName;
            //string ActionName = filterContext.ActionDescriptor.;
            SessionObj session = new SessionObj();

            bool admin = session.CSession.userData[0].Admin == null
                            ? false : (bool)session.CSession.userData[0].Admin;

            string userrole = session.CSession.userData[0].UserRoles;

            if (session.CSession == null)
            {
                filterContext.Result = new RedirectResult("~/Login/Index");
            }
            else if (userrole != "inventory")
            {

                if (!admin)
                {
                    filterContext.Result = new RedirectResult("~/Accessdenied/Index");
                }

            }

            //  }
            //  else {

            //  filterContext.Result = new RedirectResult("~/LicenseExpired/Index");

            //}

        }

    }



    public class AdminOnly : ActionFilterAttribute
    {

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            string ActionName = filterContext.ActionDescriptor.ActionName;
            //string ActionName = filterContext.ActionDescriptor.;
            SessionObj session = new SessionObj();

            bool admin = session.CSession.userData[0].Admin == null
                            ? false : (bool)session.CSession.userData[0].Admin;

            string userrole = session.CSession.userData[0].UserRoles;

            if (session.CSession == null)
            {
                filterContext.Result = new RedirectResult("~/Login/Index");
            }
           

             if (!admin)
                {
               filterContext.Result = new RedirectResult("~/Accessdenied/Index");
              }

            

            //  }
            //  else {

            //  filterContext.Result = new RedirectResult("~/LicenseExpired/Index");

            //}

        }

    }

}