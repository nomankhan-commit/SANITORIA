using SANITORIA.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace SANITORIA.Controllers
{

    [sessionExpire]
    public class EmailController : Controller
    {
        // GET: Email
        public ActionResult Index()
        {
            return View();
        }

        public bool Email(string subject, string reciever, string message)
        {
            string password_ = ConfigurationManager.AppSettings["pass"];

            string email = ConfigurationManager.AppSettings["email"].ToString();

            reciever = reciever == null ?
                        ConfigurationManager.AppSettings["email"].ToString() : reciever;
            try
            {
                if (ModelState.IsValid)
                {
                    var senderEmail = new MailAddress(email);
                    var receiverEmail = new MailAddress(reciever);
                    var password = password_;
                    var sub = subject;
                    var body = message;
                    var smtp = new SmtpClient
                    {
                        Host = "smtp.gmail.com",
                        Port = 587,
                        EnableSsl = true,
                        DeliveryMethod = SmtpDeliveryMethod.Network,
                        UseDefaultCredentials = false,

                        Credentials = new NetworkCredential(senderEmail.Address, password)
                    };
                    using (var mess = new MailMessage(senderEmail, receiverEmail)
                    {
                        Subject = subject,
                        Body = body,
                        IsBodyHtml = true,

                    })
                    {
                        smtp.Send(mess);
                    }

                }
            }
            catch (Exception)
            {

            }

            return true;

        }

    }
}