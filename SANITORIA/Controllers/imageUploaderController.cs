using SANITORIA.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace SANITORIA.Controllers
{
    [sessionExpire]
    public class imageUploaderController : Controller
    {
        // GET: imageUploader
        public ActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public JsonResult uploadimage(string id, string name, string folder)
        {
            string imagename = "";
            try
            {


                foreach (string file in Request.Files)
                {
                    var fileContent = Request.Files[file];
                    string ext = System.IO.Path.GetExtension(fileContent.FileName);
                    imagename = name + ext;

                 
                        if (fileContent != null && fileContent.ContentLength > 0)
                        {
                            string fileLocationthumb = string.Format("{0}/{1}{2}", Server.MapPath("~/Content/" + folder + "/"), name, ext);
                            Stream strm = fileContent.InputStream;
                            var targetfilethumb = fileLocationthumb;
                            imagecompress icom = new imagecompress();
                            icom.ReducethumbnailSize(0.5, strm, targetfilethumb);
                        }
                    
                   
                }

            }
            catch (Exception)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json("Upload failed");
            }
            return Json(imagename);
        }

    }

    public class imagecompress
    {

        public void ReduceImageSize(double scaleFactor, Stream sourcePath, string targetPath)
        {
            using (var image = System.Drawing.Image.FromStream(sourcePath))
            {
                var newWidth = (int)(240 * scaleFactor);
                var newHeight = (int)(240 * scaleFactor);
                var thumbnailImg = new Bitmap(newWidth, newHeight);
                var thumbGraph = Graphics.FromImage(thumbnailImg);
                thumbGraph.CompositingQuality = CompositingQuality.HighQuality;
                thumbGraph.SmoothingMode = SmoothingMode.HighQuality;
                thumbGraph.InterpolationMode = InterpolationMode.HighQualityBicubic;
                var imageRectangle = new Rectangle(0, 0, newWidth, newHeight);
                thumbGraph.DrawImage(image, imageRectangle);
                thumbnailImg.Save(targetPath, image.RawFormat);
            }
        }

        public void ReducethumbnailSize(double scaleFactor, Stream sourcePath, string targetPath)
        {
            using (var image = System.Drawing.Image.FromStream(sourcePath))
            {
                var newWidth = (int)(image.Width * scaleFactor);
                var newHeight = (int)(image.Height * scaleFactor);
                var thumbnailImg = new Bitmap(newWidth, newHeight);
                var thumbGraph = Graphics.FromImage(thumbnailImg);
                thumbGraph.CompositingQuality = CompositingQuality.HighQuality;
                thumbGraph.SmoothingMode = SmoothingMode.HighQuality;
                thumbGraph.InterpolationMode = InterpolationMode.HighQualityBicubic;
                var imageRectangle = new Rectangle(0, 0, newWidth, newHeight);
                thumbGraph.DrawImage(image, imageRectangle);
                thumbnailImg.Save(targetPath, image.RawFormat);
            }
        }


    }
       

}