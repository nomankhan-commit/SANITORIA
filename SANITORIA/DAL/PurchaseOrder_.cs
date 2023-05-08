using Common;
using SANITORIA.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SANITORIA.DAL
{
    public class PurchaseOrder_
    {

        SANITORIA_DBEntities db = new SANITORIA_DBEntities();


        

        public Response Add(Models.PurchaseOrder data, List<RfqProduct> rfqproducts)
        {

            try
            {    // hello
                Response response = new Response();

                if (data.id > 0)
                {



                    var po = db.PurchaseOrders.Find(data.id);
                    po.vendor = data.vendor;
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

                var p = db.PO_Product.Where(x => x.po_id == data.id).ToList();
                db.PO_Product.RemoveRange(p);
                db.SaveChanges();
                foreach (var item in rfqproducts)
                {
                    PO_Product pO_Product = new PO_Product();
                    pO_Product.po_id = data.id;
                    pO_Product.product = item.product;
                    pO_Product.varient = item.varient;
                    pO_Product.qty = item.qty;
                    pO_Product.unitprice = item.unitprice;
                    pO_Product.taxes = item.taxes;
                    pO_Product.subtotal = item.subtotal;
                    db.PO_Product.Add(pO_Product);
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
                response.data1 = db.PurchaseOrders.ToList();
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

                        rfq = db.PurchaseOrders.Find(id),
                        rfqProducts = db.PO_Product.Where(x => x.po_id == id).ToList()
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

                var rfq = db.PurchaseOrders.Find(id);
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

                var po = db.PurchaseOrders.Find(id);
                po.updateAt = DateTime.Now;
                po.Status = "Nothing to bill";
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
