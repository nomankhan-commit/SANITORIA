using Common;
using SANITORIA.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SANITORIA.DAL
{
    public class warehouse
    {

        SANITORIA_DBEntities db = new SANITORIA_DBEntities();


        #region WAREHOUSE

        public Response Add(Models.warehouse data)
        {

            try
            {
                Response response = new Response();

                if (data.id > 0)
                {

                    var datadb = db.warehouses.Where(x => x.warehouse1 == data.warehouse1 && x.id != data.id).ToList();
                    if (datadb.Count == 0)
                    {

                        var userdata = db.warehouses.Find(data.id);
                        userdata.warehouse1 = data.warehouse1;
                        userdata.address = data.address;
                       
                        db.Entry(userdata).State = EntityState.Modified;
                        db.SaveChanges();
                        response.message = "updated successfully.";
                        response.status = 1;

                    }
                    else
                    {
                        response.status = 2;
                        response.message = "Name already exist.";
                    }


                }
                else
                {

                    var datadb = db.warehouses.Where(x => x.warehouse1 == data.warehouse1).ToList();
                    if (datadb.Count == 0)
                    {


                        db.warehouses.Add(data);
                        db.SaveChanges();
                        response.message = "created successfully.";
                        response.status = 1;

                    }
                    else
                    {
                        response.status = 2;
                        response.message = "Name already exist.";
                    }


                }




                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }
        public Response GetAll()
        {

            try
            {

                Response response = new Response();
                response.data1 = db.warehouses.ToList();
                response.status = 1;
                response.message = "Loaded successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }
        public Response GetByid(int id)
        {

            try
            {

                Response response = new Response();
                response.data1 = new { wherhouse = db.warehouses.Find(id)};
                response.status = 1;
                response.message = "Loaded successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }
        public Response delete(int id)
        {

            try
            {
                var dat = db.warehouses.Find(id);
                db.warehouses.Remove(dat);
                db.SaveChanges();
                Response response = new Response();
                response.data1 =
                response.status = 1;
                response.message = "Removed successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }

        #endregion

    }
}