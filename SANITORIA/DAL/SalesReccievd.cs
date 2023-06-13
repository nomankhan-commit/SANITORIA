using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Common;
using SANITORIA.Models;

namespace SANITORIA.DAL
{
    public class SalesReccievd
    {

        SANITORIA_DBEntities db = new SANITORIA_DBEntities();




        public Response Add(Models.SALES_RECEIVED_ORDER data, List<SALES_RECV_Product> rec_Product)
        {

            try
            {    // hello
                SALES_RECEIVED_ORDER SALES_RECEIVED_ORDER = new SALES_RECEIVED_ORDER();
                Response response = new Response();

                if (data.id > 0)
                {



                    var rec = db.SALES_RECEIVED_ORDER.Find(data.id);
                    rec.customer = data.customer;
                    rec.SO_ID = data.SO_ID;
                    rec.company = data.company;
                    rec.currenty = data.currenty;
                    rec.orderDeadLine = data.orderDeadLine;
                    rec.RecieptDate = data.RecieptDate;
                    rec.DeliverTo = data.DeliverTo;
                    rec.Status = "waiting for bill";
                    rec.createAT = data.createAT;
                    rec.updateAt = data.updateAt;
                    rec.createBy = data.createBy;
                    rec.updateBy = data.updateBy;
                    rec.updateAt = DateTime.Now;
                    rec.isDeleted = false;
                    db.Entry(rec).State = EntityState.Modified;
                    db.SaveChanges();
                    response.message = "updated successfully.";
                    response.status = 1;

                    response.data1 = data.id;



                }
                else
                {



                    data.createAT = DateTime.Now;
                    data.updateAt = DateTime.Now;
                    data.createBy = 1;
                    data.updateBy = 0;
                    data.isDeleted = false;
                    data.Status = "waiting for bill";
                    db.SALES_RECEIVED_ORDER.Add(data);
                    db.SaveChanges();
                    response.message = "Received successfully.";
                    response.status = 1;
                    response.data1 = data.id;

                }

                int poind = Convert.ToInt32(data.SO_ID);

                var po_ = db.SalesOrders.Where(x => x.id == poind).FirstOrDefault();
                po_.Status = "waiting for bill";
                db.Entry(po_).State = EntityState.Modified;
                db.SaveChanges();
                var rp = db.SALES_RECV_Product.Where(x => x.Recid == data.id).ToList();
                db.SALES_RECV_Product.RemoveRange(rp);
                db.SaveChanges();
                foreach (var item in rec_Product)
                {

                    SALES_RECV_Product SALES_RECV_Product = new SALES_RECV_Product();
                    SALES_RECV_Product.Recid = data.id;
                    SALES_RECV_Product.so_id = po_.id;
                    SALES_RECV_Product.product = item.product;
                    SALES_RECV_Product.varient = "";// item.varient;
                    SALES_RECV_Product.qty = item.qty;
                    SALES_RECV_Product.REC_qty = item.REC_qty;
                    SALES_RECV_Product.unitprice = item.unitprice;
                    SALES_RECV_Product.taxes = item.taxes;
                    SALES_RECV_Product.subtotal = item.subtotal;
                    db.SALES_RECV_Product.Add(SALES_RECV_Product);
                    db.SaveChanges();

                    db.sp_updateRecievedProductQty(item.product, item.REC_qty);
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
                response.data1 = db.SALES_RECEIVED_ORDER.ToList();
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

                        rfq = db.SALES_RECEIVED_ORDER.Find(id),
                        rfqProducts = db.SALES_RECV_Product.Where(x => x.Recid == id).ToList()
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

        public Response SoReceived(int poid)
        {

            try
            {

                Response response = new Response();
                response.data1 =
                    new
                    {

                        po = db.SalesOrders.Find(poid),
                        poProducts = db.SO_Product.Where(x => x.id == poid).ToList()
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

        public Response conforOrder(int id)
        {

            try
            {

                var rfq = db.RFQs.Find(id);
                rfq.updateAt = DateTime.Now;
                rfq.Status = "Purchase Order";
                db.Entry(rfq).State = EntityState.Modified;
                db.SaveChanges();


                PurchaseOrder purchaseOrder = new PurchaseOrder();
                purchaseOrder.RFQ_ID = rfq.RFQ_id;
                purchaseOrder.vendor = rfq.vendor;
                purchaseOrder.company = rfq.company;
                purchaseOrder.currenty = rfq.currenty;
                purchaseOrder.orderDeadLine = rfq.orderDeadLine;
                purchaseOrder.RecieptDate = rfq.RecieptDate;
                purchaseOrder.DeliverTo = rfq.DeliverTo;
                purchaseOrder.Status = rfq.Status;
                purchaseOrder.createAT = rfq.createAT;
                purchaseOrder.isDeleted = false;
                db.PurchaseOrders.Add(purchaseOrder);
                db.SaveChanges();

                var p = db.PO_Product.Where(x => x.po_id == purchaseOrder.id).ToList();
                db.PO_Product.RemoveRange(p);
                db.SaveChanges();

                var rfqp = db.RfqProducts.Where(x => x.rfqid == id).ToList();

                foreach (var item in rfqp)
                {

                    PO_Product pO_Product = new PO_Product();

                    pO_Product.po_id = purchaseOrder.id;
                    pO_Product.product = item.product;
                    pO_Product.varient = item.varient;
                    pO_Product.qty = item.qty;
                    pO_Product.unitprice = item.unitprice;
                    pO_Product.taxes = item.taxes;
                    pO_Product.subtotal = item.subtotal;

                    db.PO_Product.Add(pO_Product);
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

                var rfq = db.RFQs.Find(id);
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

        public Response paybill(SalesBill data)
        {

            try
            {

                var rec = db.SALES_RECEIVED_ORDER.Where(x => x.REC_id == data.SALES_rec).FirstOrDefault();
                rec.updateAt = DateTime.Now;
                rec.Status = "close";
                db.Entry(rec).State = EntityState.Modified;
                db.SaveChanges();

                rec.SO_ID = "SO_" + rec.SO_ID;
                var po = db.SalesOrders.Where(x => x.SO_id == rec.SO_ID).FirstOrDefault();
                rec.updateAt = DateTime.Now;
                rec.Status = "close";
                db.Entry(po).State = EntityState.Modified;
                db.SaveChanges();

                var rfq = db.SalesQuotations.Where(x => x.SQ_id == po.SQ_ID).FirstOrDefault();
                rec.updateAt = DateTime.Now;
                rec.Status = "close";
                db.Entry(rfq).State = EntityState.Modified;
                db.SaveChanges();


                db.SalesBills.Add(data);
                db.SaveChanges();


                var bil = db.SalesBills.Find(data.ID);
                var rece = db.SALES_RECEIVED_ORDER.Where(e => e.REC_id == bil.SALES_rec).ToList();
                foreach (var item in rece)
                {
                   // item.REC_idn

                     
                }


                Response response = new Response();
                response.status = 1;
                response.message = "Billing completed successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }


    }
}