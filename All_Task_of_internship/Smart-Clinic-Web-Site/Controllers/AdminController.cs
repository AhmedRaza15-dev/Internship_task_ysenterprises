using Microsoft.AspNetCore.Mvc;

namespace Smart_Clinic_Web_site.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Dashboard()
        {
            return View();
        }
    }
}
