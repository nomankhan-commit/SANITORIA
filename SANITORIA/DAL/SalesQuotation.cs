using Common;
using SANITORIA.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SANITORIA.DAL
{
    public class SalesQuotation
    {

            SANITORIA_DBEntities db = new SANITORIA_DBEntities();


            #region PRODUCTS

            public Response Add(Models.SalesQuotation data, List<SalesQuotationProduct> SalesQuotationProduct)
            {

                try
                {    // hello
                    Response response = new Response();

                    if (data.id > 0)
                    {



                        var SalesQuotations = db.SalesQuotations.Find(data.id);
                        SalesQuotations.vendor = data.vendor;
                        SalesQuotations.SQ_id = data.SQ_id;
                        SalesQuotations.company = data.company;
                        SalesQuotations.currenty = data.currenty;
                        SalesQuotations.orderDeadLine = data.orderDeadLine;
                        SalesQuotations.RecieptDate = data.RecieptDate;
                        SalesQuotations.DeliverTo = data.DeliverTo;
                        //rfq.Status = data.Status;
                        SalesQuotations.createAT = data.createAT;
                        SalesQuotations.updateAt = data.updateAt;
                        SalesQuotations.createBy = data.createBy;
                        SalesQuotations.updateBy = data.updateBy;
                        SalesQuotations.updateAt = DateTime.Now;
                        SalesQuotations.isDeleted = false;
                        db.Entry(SalesQuotations).State = EntityState.Modified;
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
                        data.Status = "SalesQuotations";
                        data.isDeleted = false;
                        db.SalesQuotations.Add(data);
                        db.SaveChanges();


                    }

                    var p = db.SalesQuotationProducts.Where(x => x.SQid == data.id).ToList();
                    db.SalesQuotationProducts.RemoveRange(p);
                    db.SaveChanges();
                    foreach (var item in SalesQuotationProduct)
                    {
                        item.SQid = data.id;
                        item.varient = "";
                        item.varientID = "";
                        db.SalesQuotationProducts.Add(item);
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
                    response.data1 = db.SalesQuotations.ToList();
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

                            salesquotation = db.SalesQuotations.Find(id),
                            salesquotationProducts = db.SalesQuotationProducts.Where(x => x.SQid == id).ToList()
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
                    var dat = db.SalesQuotations.Find(id);
                    db.SalesQuotations.Remove(dat);
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

        public Response conforOrder(int id)
        {

            try
            {

                var SQ = db.SalesQuotations.Find(id);
                SQ.updateAt = DateTime.Now;
                SQ.Status = "Sales Order";
                db.Entry(SQ).State = EntityState.Modified;
                db.SaveChanges();


                SalesOrder salesOrder = new SalesOrder();
                salesOrder.SO_id = SQ.SQ_id;
                salesOrder.SQ_ID = SQ.SQ_id;
                salesOrder.Customer = SQ.Customer;
                salesOrder.company = SQ.company;
                salesOrder.currenty = SQ.currenty;
                salesOrder.orderDeadLine = SQ.orderDeadLine;
                salesOrder.RecieptDate = SQ.RecieptDate;
                salesOrder.DeliverTo = SQ.DeliverTo;
                salesOrder.Status = SQ.Status;
                salesOrder.createAT = SQ.createAT;
                salesOrder.isDeleted = false;
                db.SalesOrders.Add(salesOrder);
                db.SaveChanges();

                var p = db.SO_Product.Where(x => x.so_id == salesOrder.id).ToList();
                db.SO_Product.RemoveRange(p);
                db.SaveChanges();

                var rfqp = db.SalesQuotationProducts.Where(x => x.SQid == id).ToList();

                foreach (var item in rfqp)
                {

                    SO_Product sO_Product = new SO_Product();

                    sO_Product.so_id = salesOrder.id;
                    sO_Product.product = item.product;
                    sO_Product.varient = item.varient;
                    sO_Product.qty = item.qty;
                    sO_Product.unitprice = item.unitprice;
                    sO_Product.taxes = item.taxes;
                    sO_Product.subtotal = item.subtotal;

                    db.SO_Product.Add(sO_Product);
                    db.SaveChanges();
                }

                Response response = new Response();
                response.status = 1;
                response.message = "Order confirm successfully.";
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

                    var rfq = db.SalesQuotations.Find(id);
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

            #endregion

        

    }



}