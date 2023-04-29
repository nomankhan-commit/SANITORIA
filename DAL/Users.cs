using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common;
namespace DAL
{
    public class Users
    {

        private  SANITORIA_DBEntities1 db = new SANITORIA_DBEntities1();

        public Response Add(USER data) {

            try
            {
                Response response = new Response();
                db.USERS.Add(data);
                db.SaveChanges();
                response.status = 1;
                return response;
            }
            catch (Exception)
            {

                throw;
            }
          
        }

    }
}
