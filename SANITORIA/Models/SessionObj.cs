using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SANITORIA.Models
{
    public class SessionObj
    {
        //private SessionObj currentSession { get; set; }
        //public SessionObj currentSession
        //{
        //    get
        //    {
        //        if (HttpContext.Current != null && HttpContext.Current.Session["Fin_Session"] != null)
        //        {
        //            return (SessionObj)HttpContext.Current.Session["Fin_Session"];
        //        }
        //        else
        //        {
        //            //return currentSession = new LoginViewModel().GetValuesForSession(13);
        //            return null;
        //        }
        //    }
        //    set { HttpContext.Current.Session["Fin_Session"] = value; }
        //}

        public sessionDetails CSession
        {
            get
            {
                if (HttpContext.Current != null && HttpContext.Current.Session["App_Session"] != null)
                {
                    return (sessionDetails)HttpContext.Current.Session["App_Session"];
                }
                else
                {
                    //return currentSession = new LoginViewModel().GetValuesForSession(13);
                    return null;
                }
            }
            set { HttpContext.Current.Session["App_Session"] = value; }
        }

    }

    public interface IsessionInterface
    {

        List<USER> LoginObj { get; set; }

    }
}