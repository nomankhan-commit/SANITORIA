using Common;
using SANITORIA.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SANITORIA.DAL
{
    
    public class SalesOrder_
    {

        SANITORIA_DBEntities db = new SANITORIA_DBEntities();




        public Response Add(Models.SalesOrder data, List<SalesQuotationProduct> rfqproducts)
        {

            try
            {    // hello
                Response response = new Response();

                if (data.id > 0)
                {



                    var po = db.SalesOrders.Find(data.id);
                    po.Customer = data.Customer;
                    po.company = data.company;
                    po.currenty = data.currenty;
                    po.orderDeadLine = data.orderDeadLine;
                    po.RecieptDate = data.RecieptDate;
                    po.DeliverTo = data.DeliverTo;
                    // po.Status = data.Status;
                    po.createAT = data.createAT;
                    po.updateAt = data.updateAt;
                    po.createBy = data.createBy;
                    po.updateBy = data.updateBy;
                    po.updateAt = DateTime.Now;
                    po.isDeleted = false;
                    db.Entry(po).State = EntityState.Modified;
                    db.SaveChanges();
                    response.message = "updated successfully.";
                    response.status = 1;
                    response.message = "updated successfully.";
                    response.status = 1;


                }
                else
                {

                    //response.message = "Save successfully.";
                    //response.status = 1;
                    //data.createAT = DateTime.Now;
                    //data.Status = "Rfq";
                    //data.isDeleted = false;
                    //db.RFQs.Add(data);
                    //db.SaveChanges();


                }

                var p = db.SO_Product.Where(x => x.so_id == data.id).ToList();
                db.SO_Product.RemoveRange(p);
                db.SaveChanges();
                foreach (var item in rfqproducts)
                {
                    SO_Product sO_Product = new SO_Product();
                    sO_Product.so_id = data.id;
                    sO_Product.product = item.product;
                    sO_Product.varient = "";// item.varient;
                    sO_Product.qty = item.qty;
                    sO_Product.unitprice = item.unitprice;
                    sO_Product.taxes = item.taxes;
                    sO_Product.subtotal = item.subtotal;
                    db.SO_Product.Add(sO_Product);
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
                response.data1 = db.SalesOrders.ToList();
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

                        so = db.SalesOrders.Find(id),
                        soProducts = db.SO_Product.Where(x => x.so_id == id).ToList()
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
        public Response cancel(int id)
        {

            try
            {

                var rfq = db.SalesOrders.Find(id);
                rfq.updateAt = DateTime.Now;
                rfq.Status = "Cancel";
                rfq.isDeleted = true;
                db.Entry(rfq).State = EntityState.Modified;
                db.SaveChanges();
                Response response = new Response();
                response.status = 1;
                response.message = "Cancel successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }

        public Response conforOrder(int id)
        {

            try
            {

                var po = db.SalesOrders.Find(id);
                po.updateAt = DateTime.Now;
                po.Status = "Delivery Chalan";
                db.Entry(po).State = EntityState.Modified;
                db.SaveChanges();

                Response response = new Response();
                response.status = 1;
                response.message = "status changed to nothing to bill.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }


    }

}