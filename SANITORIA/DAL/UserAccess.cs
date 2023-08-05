using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SANITORIA.Models;
using Common;
using System.Data.Entity;

namespace SANITORIA.DAL
{

    
    public class UserAccess
    {
        private SANITORIA_DBEntities db { get; set; }
        public UserAccess() {

            db = new SANITORIA_DBEntities();
        
        }
        
        public Response AddUser(USER data) {

            try
            {
                Response response = new Response();

                if (data.id>0)
                {

                    var datadb = db.USERS.Where(x => x.email == data.email && x.id != data.id).ToList();
                    if (datadb.Count == 0)
                    {

                        var userdata = db.USERS.Find(data.id);
                        userdata.email = data.email;
                        userdata.CompleteName = data.CompleteName;
                        userdata.nic = data.nic;
                        userdata.password = data.password;
                        userdata.UserRoles = data.UserRoles;
                        userdata.imgGuid = data.imgGuid;
                        userdata.isActive = data.isActive;
                        userdata.contactNo = data.contactNo;
                        userdata.updateAT = DateTime.Now;
                        db.Entry(userdata).State = EntityState.Modified;
                        db.SaveChanges();
                        response.message = "User updated successfully.";
                        response.status = 1;

                    }
                    else
                    {
                        response.status = 2;
                        response.message = "Email already exist.";
                    }

                     
                }
                else
                {

                    var datadb = db.USERS.Where(x => x.email == data.email).ToList();
                    if (datadb.Count == 0)
                    {

                        data.createAT = DateTime.Now;
                        db.USERS.Add(data);
                        db.SaveChanges();
                        response.message = "User created successfully.";
                        response.status = 1;

                    }
                    else
                    {
                        response.status = 2;
                        response.message = "Email already exist.";
                    }

                  
                }
               
                
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }
         
        
        }
        public Response checkemail(USER data)
        {

            try
            {
                Response response = new Response();
                 var datadb = db.USERS.Where(x => x.email == data.email || x.id==data.id).ToList();
                if (datadb.Count > 0)
                {
                  
                    response.message = "Email already exist.";
                    response.status = 2;
                }
                else
                {
                    response.message = "Email does not exist.";
                    response.status = 1;
                }

                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }

        public Response GetAllUser()
        {

            try
            {

                Response response = new Response();
                response.data1 = db.USERS.Where(x => x.Admin != true).ToList();//    db.USERS.ToList();
                response.status = 1;
                response.message = "User Loaded successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }


        public Response GetUserByid(int id)
        {

            try
            {

                Response response = new Response();
                response.data1 = db.USERS.Find(id);
                response.status = 1;
                response.message = "User Loaded successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }
        public Response deleteUser(int id)
        {

            try
            {
                var dat = db.USERS.Find(id);
                db.USERS.Remove(dat);
                db.SaveChanges();
                Response response = new Response();
                response.data1 = 
                response.status = 1;
                response.message = "User removed successfully.";
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }


        }

    }
}