using Common;
using SANITORIA.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SANITORIA.DAL
{
    public class Tax_
    {
        SANITORIA_DBEntities db = new SANITORIA_DBEntities();


        #region Tax

        public Response Addtax(Tax data)
        {

            try
            {
                Response response = new Response();

                if (data.id > 0)
                {

                    var datadb = db.Taxes.Where(x => x.TaxName == data.TaxName && x.id != data.id).ToList();
                    if (datadb.Count == 0)
                    {

                        var userdata = db.Taxes.Find(data.id);
                        userdata.TaxName = data.TaxName;
                        userdata.type = data.type;
                        userdata.taxComputation = data.taxComputation;
                        userdata.taxScope = data.taxScope;
                        userdata.active = data.active;
                        userdata.amount = data.amount;

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

                    var datadb = db.Taxes.Where(x => x.TaxName == data.TaxName).ToList();
                    if (datadb.Count == 0)
                    {


                        db.Taxes.Add(data);
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
        public Response GetAllTax()
        {

            try
            {

                Response response = new Response();
                response.data1 = db.Taxes.ToList();
                response.status = 1;
                response.message = "Loaded successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }
        public Response GetTaxByid(int id)
        {

            try
            {

                Response response = new Response();
                response.data1 = db.Taxes.Find(id);
                response.status = 1;
                response.message = "Loaded successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }
        public Response deleteTax(int id)
        {

            try
            {
                var dat = db.Taxes.Find(id);
                db.Taxes.Remove(dat);
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