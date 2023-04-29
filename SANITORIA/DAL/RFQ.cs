using Common;
using SANITORIA.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SANITORIA.DAL
{
    public class RFQ
    {

        SANITORIA_DBEntities db = new SANITORIA_DBEntities();


        #region PRODUCTS

        public Response Add(Models.RFQ data, List<RfqProduct> rfqproducts)
        {

            try
            {
                Response response = new Response();

                if (data.id > 0)
                {

                  

                        var rfq = db.RFQs.Find(data.id);
                        rfq.vendor = data.vendor;
                        rfq.RFQ_id = data.RFQ_id;
                        rfq.company = data.company;
                        rfq.currenty = data.currenty;
                        rfq.orderDeadLine = data.orderDeadLine;
                        rfq.RecieptDate = data.RecieptDate;
                        rfq.DeliverTo = data.DeliverTo;
                        rfq.createAT = data.createAT;
                        rfq.updateAt = data.updateAt;
                        rfq.createBy = data.createBy;
                        rfq.updateBy = data.updateBy;
                         rfq.updateAt = DateTime.Now;
                        db.Entry(rfq).State = EntityState.Modified;
                        db.SaveChanges();
                        response.message = "updated successfully.";
                        response.status = 1;
                        response.message = "updated successfully.";
                        response.status = 1;

                    
                   


                }
                else
                {

                        response.message = "Save successfully.";
                        response.status = 1;
                        data.createAT = DateTime.Now;
                        db.RFQs.Add(data);
                        db.SaveChanges();

                    
                }

                var p = db.RfqProducts.Where(x => x.rfqid == data.id).ToList();
                db.RfqProducts.RemoveRange(p);
                db.SaveChanges();
                foreach (var item in rfqproducts)
                {
                    item.rfqid = data.id;
                    db.RfqProducts.Add(item);
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
                response.data1 = db.RFQs.ToList();
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
                response.data1 =
                    new
                    {
                        
                        rfq = db.RFQs.Find(id),
                        rfqProducts = db.RfqProducts.Where(x => x.rfqid == id).ToList()
                    };
                response.status = 1;
                response.message = "Loaded successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }
        public Response GetAllProductVarient()
        {

            try
            {

                Response response = new Response();
                response.data1 = db.ProductsVariant_.ToList();
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
                var dat = db.RfqProducts.Find(id);
                db.RfqProducts.Remove(dat);
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