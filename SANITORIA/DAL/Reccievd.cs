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


       

        public Response Add(Models.PurchaseOrder data, List<PO_Product> po_Product)
        {

            try
            {    // hello
                RECEIVED_ORDER rECEIVED_ORDER = new RECEIVED_ORDER();
                Response response = new Response();

                if (data.id > 0)
                {



                    var rfq = db.PurchaseOrders.Find(data.id);
                    rfq.vendor = data.vendor;
                    rfq.PO_id = data.PO_id;
                    rfq.company = data.company;
                    rfq.currenty = data.currenty;
                    rfq.orderDeadLine = data.orderDeadLine;
                    rfq.RecieptDate = data.RecieptDate;
                    rfq.DeliverTo = data.DeliverTo;
                    //rfq.Status = data.Status;
                    rfq.createAT = data.createAT;
                    rfq.updateAt = data.updateAt;
                    rfq.createBy = data.createBy;
                    rfq.updateBy = data.updateBy;
                    rfq.updateAt = DateTime.Now;
                    rfq.isDeleted = false;
                    db.Entry(rfq).State = EntityState.Modified;
                    db.SaveChanges();
                    response.message = "updated successfully.";
                    response.status = 1;
                    response.message = "updated successfully.";
                    response.status = 1;





                }
                else
                {


                    var po = db.PurchaseOrders.Find(data.id);
                    rECEIVED_ORDER.vendor = po.vendor;
                    rECEIVED_ORDER.PO_ID = po.PO_id;
                    rECEIVED_ORDER.company = po.company;
                    rECEIVED_ORDER.currenty = po.currenty;
                    rECEIVED_ORDER.orderDeadLine = po.orderDeadLine;
                    rECEIVED_ORDER.RecieptDate = po.RecieptDate;
                    rECEIVED_ORDER.DeliverTo = po.DeliverTo;
                    //pofq.Status = data.Status;
                    rECEIVED_ORDER.createAT = DateTime.Now;
                    rECEIVED_ORDER.updateAt = DateTime.Now;
                    rECEIVED_ORDER.createBy = 1;
                    rECEIVED_ORDER.updateBy = 0;
                    rECEIVED_ORDER.isDeleted = false;

                    db.RECEIVED_ORDER.Add(rECEIVED_ORDER);
                    db.SaveChanges();
                    response.message = "updated successfully.";
                    response.status = 1;

                }

                var po_ = db.PurchaseOrders.Find(data.id);
                var rp = db.RECV_Product.Where(x=>x.id==rECEIVED_ORDER.id);
                db.RECV_Product.RemoveRange(rp);
                db.SaveChanges();
                foreach (var item in po_Product)
                {
                 
                    RECV_Product RECV_Product = new RECV_Product();
                    RECV_Product.po_id = po_.id;
                    RECV_Product.product = item.product;
                    RECV_Product.varient = item.varient;
                    RECV_Product.qty = item.qty;
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
                        rfqProducts = db.RECV_Product.Where(x => x.id == id).ToList()
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


    }
}