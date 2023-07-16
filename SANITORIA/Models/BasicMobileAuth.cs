using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Security.Principal;
using System.Web.Http;
using System.Data;


namespace SANITORIA.Models
{
    public class BasicMobileAuth : AuthorizationFilterAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            if (actionContext.Request.Headers.Authorization == null)
            {
                //BEM_Common.HttpResponseMessage response = new BEM_Common.HttpResponseMessage();
                //response.msgType = 2;
                //response.msg = "Access failed";
                //response.data = "Header doesn't contain email and password";
                //actionContext.Response = actionContext.Request.CreateResponse(System.Net.HttpStatusCode.Unauthorized, response);
            }
            else
            {
                string authToken = actionContext.Request.Headers.Authorization.Parameter;
                string decodeAuthToken = Encoding.UTF8.GetString(Convert.FromBase64String(authToken));
                string[] credArray = decodeAuthToken.Split(':');
                string email = credArray[0];
                string password = credArray[1];
                /// int password = credArray[2];
                
                DataTable dt = new DataTable();
                //var encryptedPass = Encrypter.EncryptIt(password);
                if (credArray[0] == credArray[1])
                {
                    //dt = model.LoginWithAdnameOrEmail(email, email);

                    if (dt.Rows.Count > 0)
                    {
                        DataRow dr = dt.Rows[0];
                        int userid = Convert.ToInt32(dr["userid"]);
                        if (Convert.ToInt32(dr["msgType"].ToString()) == 2)
                        {
                            
                            //response.msgType = 2;
                            //response.msg = "Login failed";
                            //response.data = "Invalid username or password";
                            //actionContext.Response = actionContext.Request.CreateResponse(System.Net.HttpStatusCode.Unauthorized, response);
                        }
                        else
                        {
                            Thread.CurrentPrincipal = new GenericPrincipal(new GenericIdentity(userid.ToString()), null);
                        }
                    }
                }
                else
                {
                    //model.email = email;
                    //model.password = password;
                    //var resp = model.Login(model);
                    //if (resp.msgType == 1)
                    //{
                    //    var sessionObj = (SessionObj)resp.data;
                    //    if (sessionObj != null)
                    //    {
                    //        //var useridStr = sessionObj.userid.ToString();
                    //        Thread.CurrentPrincipal = new GenericPrincipal(new GenericIdentity("id"), null);
                    //    }
                    //}
                    //else
                    //{
                    //    actionContext.Response = actionContext.Request.CreateResponse(System.Net.HttpStatusCode.Unauthorized, resp);
                    //}
                }
                //DataTable dt = model.Login("superadmin@bullseye.com", "Z6VRscgsMeacItvJJmD6kYnw44BT0Yc5gUx/bDybnts=");

            }
            //base.OnAuthorization(actionContext);
        }

    }
}