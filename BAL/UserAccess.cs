using BAL.Models;
using Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BAL
{
    public class UserAccess
    {

        public Response Add(Users data)
        {

            DAL.Users dAL = new DAL.Users();
            dAL.Add(data);
            return new Response();

        }

    }
}
