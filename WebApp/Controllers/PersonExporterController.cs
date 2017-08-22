using System;
using System.Web.Mvc;
using WebApp.Logs;
using System.Configuration;
using System.IO;
using Business.Domain.Domain;

namespace WebApp.Controllers
{
    public class PersonExporterController : Controller
    {
        private static readonly string LogPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "ActivityLog\\");

        // GET: PersonExporter
        public ActionResult ExportByName()
        {
            var filterdata1 = new PersonExport().NameByFrequency();
            string ActivityLogFile = Convert.ToString(ConfigurationManager.AppSettings["NameByFrequency"]);

            foreach (var item in filterdata1)
            {
                var message = item.Key + "," + item.Value;
                Logger.WriteActivityLog(message, ActivityLogFile);
            }

            byte[] fileBytes = System.IO.File.ReadAllBytes(LogPath + ActivityLogFile);
            string fileName = ActivityLogFile;
            return File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, fileName);
            // return RedirectToAction("Index", "Home");
        }

        public ActionResult ExportByAddress()
        {
            var filterData = new PersonExport().OrderByAddress();


            string ActivityLogFile = Convert.ToString(ConfigurationManager.AppSettings["NameByAddress"]);

            foreach (var item in filterData)
            {
                var message = item.Key;
                Logger.WriteActivityLog(message, ActivityLogFile);
            }

            byte[] fileBytes = System.IO.File.ReadAllBytes(LogPath + ActivityLogFile);
            string fileName = ActivityLogFile;
            return File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, fileName);
            // return RedirectToAction("Index", "Home");
        }

    }
}