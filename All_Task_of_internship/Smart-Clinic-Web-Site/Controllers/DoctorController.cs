using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Smart_Clinic_Web_site.Controllers
{
    public class DoctorController : Controller
    {
        private readonly Smart_Clinic_Web_site.Models.ApplicationDbContext _context;

        public DoctorController(Smart_Clinic_Web_site.Models.ApplicationDbContext context)
        {
            _context = context;
        }

        // Public action - view doctors list
        public IActionResult Index()
        {
            ViewData["PageTitle"] = "Our Doctors";
            var doctors = _context.Doctors;
            return View(doctors);
        }
        
        public IActionResult Dashboard()
        {
            // Doctor profile data
            ViewData["DoctorName"] = User.Identity?.Name ?? "Dr. Sarah Johnson";
            ViewData["PageTitle"] = "Doctor Dashboard";
            ViewData["Specialization"] = "Cardiology";
            ViewData["Rating"] = "4.8";
            ViewData["ReviewCount"] = "87";
            ViewData["Email"] = "sarah.johnson@medixpro.com";
            ViewData["Phone"] = "+1 (555) 123-4567";
            ViewData["Status"] = "Active";
            ViewData["Languages"] = new[] { "English", "Spanish" };
            
            // About section
            ViewData["About"] = "Dr. Sarah Johnson is a board-certified cardiologist with over 8 years of experience in diagnosing and treating heart conditions. She specializes in preventive cardiology and heart failure management.";
            
            // Education & Certifications
            ViewData["Education"] = new[] {
                new { Degree = "MD", Institution = "Harvard Medical School", Year = "2012" },
                new { Degree = "Residency in Internal Medicine", Institution = "Johns Hopkins Hospital", Year = "2015" }
            };
            
            ViewData["Certifications"] = new[] {
                new { Name = "Board Certification in Cardiology", Organization = "American Board of Internal Medicine", Year = "2018" },
                new { Name = "Advanced Cardiac Life Support (ACLS)", Organization = "American Heart Association", Year = "2022" }
            };
            
            // Weekly Schedule
            ViewData["WeeklySchedule"] = new[] {
                new { Day = "Monday", Hours = "09:00 AM - 05:00 PM" },
                new { Day = "Tuesday", Hours = "09:00 AM - 05:00 PM" },
                new { Day = "Wednesday", Hours = "09:00 AM - 05:00 PM" },
                new { Day = "Thursday", Hours = "09:00 AM - 05:00 PM" },
                new { Day = "Friday", Hours = "09:00 AM - 03:00 PM" },
                new { Day = "Saturday", Hours = "10:00 AM - 01:00 PM" },
                new { Day = "Sunday", Hours = "Closed" }
            };
            
            // Today's Appointments
            ViewData["TodayAppointments"] = new[] {
                new { Time = "09:00 AM", Type = "Check-up", Patient = "John Smith", Status = "Completed" },
                new { Time = "10:30 AM", Type = "Consultation", Patient = "Emily Davis", Status = "Completed" },
                new { Time = "01:00 PM", Type = "Follow-up", Patient = "Michael Brown", Status = "Scheduled" },
                new { Time = "03:30 PM", Type = "New Patient", Patient = "Jessica Wilson", Status = "Scheduled" }
            };
            
            // Statistics for charts
            ViewData["AppointmentsPerDay"] = new[] { 12, 19, 15, 22, 18, 14, 8 }; // Last 7 days
            ViewData["AppointmentLabels"] = new[] { "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" };
            
            ViewData["PatientDemographics"] = new[] { 35, 25, 20, 15, 5 }; // Age groups
            ViewData["DemographicLabels"] = new[] { "18-30", "31-45", "46-60", "61-75", "76+" };
            
            return View();
        }
        
        public IActionResult Appointments()
        {
            return View();
        }
        
        public IActionResult Patients()
        {
            return View();
        }

        // Doctor schedule view
        public IActionResult Schedule()
        {
            ViewData["PageTitle"] = "Doctor Schedule";
            return View();
        }

        // Doctor specializations view
        public IActionResult Specialization()
        {
            ViewData["PageTitle"] = "Doctor Specializations";
            ViewData["Specializations"] = new[] { "Cardiology", "Orthopedics", "Neurology", "Pediatrics", "Dermatology", "Oncology" };
            return View();
        }
        
        public IActionResult BookAppointment(int doctorId, string doctorName)
        {
            ViewData["PageTitle"] = "Book Appointment";
            ViewData["DoctorId"] = doctorId;
            ViewData["DoctorName"] = doctorName;
            
            return View();
        }

        // GET: Doctor/Create
        public IActionResult Create()
        {
            ViewData["PageTitle"] = "Add Doctor";
            return View(new Models.Doctor());
        }

        // POST: Doctor/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Models.Doctor model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            // assign an Id in this in-memory store
            model.Id = (_context.Doctors.Count > 0) ? _context.Doctors.Max(d => d.Id) + 1 : 1;
            _context.Doctors.Add(model);
            _context.SaveChanges();

            TempData["SuccessMessage"] = "Doctor added successfully.";
            return RedirectToAction("Index");
        }
    }
}