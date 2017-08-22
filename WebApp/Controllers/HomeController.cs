using System.Web.Mvc;
using DataLayer.Domain.Repository;


namespace WebApp.Controllers
{
    public class HomeController : Controller
    {
      
        public ActionResult Index()
        {
            var person = new PersonRepo();
            var personList = person.GetData();
            return View(personList);
        }
       }
}