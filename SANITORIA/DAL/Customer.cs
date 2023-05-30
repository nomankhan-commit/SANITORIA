using Common;
using SANITORIA.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SANITORIA.DAL
{
    public class Customer
    {
    
        SANITORIA_DBEntities db = new SANITORIA_DBEntities();


        #region Tax

        public Response Add(customer data, List<CustomerBankAccoutn> bankAccoutns)
        {

            try
            {
                Response response = new Response();

                if (data.id > 0)
                {

                    var datadb = db.customers.Where(x => x.Name == data.Name && x.id != data.id).ToList();
                    if (datadb.Count == 0)
                    {

                        var userdata = db.customers.Find(data.id);
                        userdata.Name = data.Name;
                        userdata.phone = data.phone;
                        userdata.email = data.email;
                        userdata.website = data.website;
                        userdata.zipcode = data.zipcode;
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

                    var datadb = db.customers.Where(x => x.Name == data.Name).ToList();
                    if (datadb.Count == 0)
                    {


                        db.customers.Add(data);
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


                var p = db.CustomerBankAccoutns.Where(x => x.v_id == data.id).ToList();
                db.CustomerBankAccoutns.RemoveRange(p);
                db.SaveChanges();
                foreach (var item in bankAccoutns)
                {
                    item.v_id = data.id;
                    db.CustomerBankAccoutns.Add(item);
                    db.SaveChanges();
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
                response.data1 = db.customers.ToList();
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
                response.data1 = new { customer = db.customers.Find(id), bankaccount = db.CustomerBankAccoutns.Where(x => x.v_id == id).ToList() };
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
                var dat = db.customers.Find(id);
                db.customers.Remove(dat);
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