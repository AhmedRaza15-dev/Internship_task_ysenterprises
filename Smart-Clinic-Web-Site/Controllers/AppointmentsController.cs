using Microsoft.AspNetCore.Mvc;

namespace Smart_Clinic_Web_site.Controllers
{
    public class AppointmentsController : Controller
    {
        public IActionResult Index()
        {
            // Redirect to the existing Patient booking page
            return RedirectToAction("BookAppointment", "Patient");
        }
    }
}
