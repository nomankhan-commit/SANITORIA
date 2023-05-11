using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Common;
using SANITORIA.Models;

namespace SANITORIA.DAL
{
    public class Reccievd
    {

        SANITORIA_DBEntities db = new SANITORIA_DBEntities();


       

        public Response Add(Models.RECEIVED_ORDER data, List<RECV_Product> rec_Product)
        {

            try
            {    // hello
                RECEIVED_ORDER rECEIVED_ORDER = new RECEIVED_ORDER();
                Response response = new Response();

                if (data.id > 0)
                {



                    var rec = db.RECEIVED_ORDER.Find(data.id);
                    rec.vendor = data.vendor;
                    rec.PO_ID = data.PO_ID;
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





                }
                else
                {


                  
                    data.createAT = DateTime.Now;
                    data.updateAt = DateTime.Now;
                    data.createBy = 1;
                    data.updateBy = 0;
                    data.isDeleted = false;
                    data.Status = "waiting for bill";
                    db.RECEIVED_ORDER.Add(data);
                    db.SaveChanges();
                    response.message = "Received successfully.";
                    response.status = 1;

                }

                int poind = Convert.ToInt32(data.PO_ID);

                var po_ = db.PurchaseOrders.Where(x => x.id == poind).FirstOrDefault();
                po_.Status = "waiting for bill";
                db.Entry(po_).State = EntityState.Modified;
                db.SaveChanges();

                var rp = db.RECV_Product.Where(x=>x.Recid==data.id).ToList();
                db.RECV_Product.RemoveRange(rp);
                db.SaveChanges();
                foreach (var item in rec_Product)
                {
                 
                    RECV_Product RECV_Product = new RECV_Product();
                    RECV_Product.Recid = data.id;
                    RECV_Product.po_id = po_.id;
                    RECV_Product.product = item.product;
                    RECV_Product.varient = item.varient;
                    RECV_Product.qty = item.qty;
                    RECV_Product.REC_qty = item.REC_qty;
                    RECV_Product.unitprice = item.unitprice;
                    RECV_Product.taxes = item.taxes;
                    RECV_Product.subtotal = item.subtotal;
                    db.RECV_Product.Add(RECV_Product);
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
                response.data1 = db.RECEIVED_ORDER.ToList();
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

                        rfq = db.RECEIVED_ORDER.Find(id),
                        rfqProducts = db.RECV_Product.Where(x => x.Recid == id).ToList()
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

        public Response PoReceived(int poid)
        {

            try
            {

                Response response = new Response();
                response.data1 =
                    new
                    {

                        po = db.PurchaseOrders.Find(poid),
                        poProducts = db.PO_Product.Where(x => x.id == poid).ToList()
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

        public Response paybill(Bill data)
        {

            try
            {

                var rec = db.RECEIVED_ORDER.Where(x=>x.REC_id == data.rec).FirstOrDefault();
                rec.updateAt = DateTime.Now;
                rec.Status = "close";
                db.Entry(rec).State = EntityState.Modified;
                db.SaveChanges();

                rec.PO_ID =  "PO_"+rec.PO_ID;
                var po = db.PurchaseOrders.Where(x => x.PO_id == rec.PO_ID).FirstOrDefault();
                rec.updateAt = DateTime.Now;
                rec.Status = "close";
                db.Entry(po).State = EntityState.Modified;
                db.SaveChanges();

                var rfq = db.RFQs.Where(x => x.RFQ_id == po.RFQ_ID).FirstOrDefault();
                rec.updateAt = DateTime.Now;
                rec.Status = "close";
                db.Entry(rfq).State = EntityState.Modified;
                db.SaveChanges();


                db.Bills.Add(data);
                db.SaveChanges();


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