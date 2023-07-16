
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http;
using System.Web.Http.Description;
//using Microsoft.AspNetCore.Cors;
using System.Web.Mvc;

namespace SANITORIA.Controllers.API
{

    //[EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DefaultController : ApiController
    {
        // GET: Default

        [System.Web.Http.Route("api/index")]
        [System.Web.Http.HttpPost]
        public string Index()
        {
            return "";
        }
    }
}