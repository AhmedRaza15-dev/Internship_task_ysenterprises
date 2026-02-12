using Microsoft.AspNetCore.Mvc;

namespace Smart_Clinic_Web_site.Controllers
{
    public class AuthController : Controller
    {
        // GET: /Auth/Login
        public IActionResult Login()
        {
            return View();
        }

        // GET: /Auth/Register
        public IActionResult Register()
        {
            return View();
        }
    }
}
