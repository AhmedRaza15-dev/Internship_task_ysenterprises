using Microsoft.AspNetCore.Mvc;
using Smart_Clinic_Web_site.Models;
using System.Diagnostics;

namespace Smart_Clinic_Web_site.Controllers
{
    public class PatientController : Controller
    {
        /// <summary>
        /// Patient Dashboard - Shows overview of patient information
        /// </summary>
        public IActionResult Dashboard()
        {
            var model = new DashboardViewModel
            {
                TotalPatients = 1245,
                TodayAppointments = 18,
                TotalDoctors = 24,
                AvailableRooms = 8,
                RecentPatients = GetRecentPatients(),
                UpcomingAppointments = GetUpcomingAppointments(),
                CriticalPatients = GetCriticalPatients(),
                DepartmentStats = GetDepartmentStats(),
                MonthlyVisits = GetMonthlyVisits()
            };

            return View("~/Views/Patient/Index.cshtml", model);
        }

        /// <summary>
        /// Patient Appointments - Display all appointments for the logged-in patient
        /// </summary>
        public IActionResult MyAppointments()
        {
            // Get current patient ID (would come from authenticated user in production)
            int patientId = 1; // Default patient ID for testing
            
            var appointments = GetPatientAppointments(patientId);
            return View(appointments);
        }

        /// <summary>
        /// Book Appointment - Show appointment booking form
        /// </summary>
        public IActionResult BookAppointment()
        {
            var model = new AppointmentBookingViewModel
            {
                AvailableDoctors = GetAvailableDoctors(),
                AvailableTimeSlots = GetAvailableTimeSlots(),
                Departments = GetDepartments()
            };

            return View(model);
        }

        /// <summary>
        /// Book Appointment POST - Save new appointment
        /// </summary>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult BookAppointment(AppointmentBookingViewModel model)
        {
            if (ModelState.IsValid)
            {
                // Save appointment to database
                // For now, just redirect to confirmation
                ViewBag.Message = "Appointment booked successfully!";
                ViewBag.AppointmentTime = model.AppointmentDate;
                ViewBag.DoctorName = model.SelectedDoctorName;
                
                return View("AppointmentConfirmation", model);
            }

            model.AvailableDoctors = GetAvailableDoctors();
            model.AvailableTimeSlots = GetAvailableTimeSlots();
            model.Departments = GetDepartments();
            
            return View(model);
        }

        /// <summary>
        /// View Prescriptions - Display all prescriptions for the logged-in patient
        /// </summary>
        public IActionResult ViewPrescriptions()
        {
            // Get current patient ID (would come from authenticated user in production)
            int patientId = 1; // Default patient ID for testing
            
            var prescriptions = GetPatientPrescriptions(patientId);
            return View(prescriptions);
        }

        /// <summary>
        /// Prescription Details - View specific prescription details
        /// </summary>
        public IActionResult PrescriptionDetails(int id)
        {
            var prescription = GetPrescriptionById(id);
            if (prescription == null)
                return NotFound();

            return View(prescription);
        }

        // Helper Methods

        private List<Appointment> GetPatientAppointments(int patientId)
        {
            return new List<Appointment>
            {
                new Appointment { Id = 1, PatientName = "John Smith", AppointmentTime = DateTime.Now.AddDays(1).AddHours(10), DoctorName = "Dr. Williams", Department = "Cardiology", Status = "Scheduled" },
                new Appointment { Id = 2, PatientName = "John Smith", AppointmentTime = DateTime.Now.AddDays(3).AddHours(14), DoctorName = "Dr. Taylor", Department = "Orthopedics", Status = "Scheduled" },
                new Appointment { Id = 3, PatientName = "John Smith", AppointmentTime = DateTime.Now.AddDays(-2).AddHours(9), DoctorName = "Dr. Rodriguez", Department = "Neurology", Status = "Completed" }
            };
        }

        private List<Doctor> GetAvailableDoctors()
        {
            return new List<Doctor>
            {
                new Doctor { Id = 1, Name = "Dr. Williams", Specialization = "Cardiology", Available = true },
                new Doctor { Id = 2, Name = "Dr. Taylor", Specialization = "Orthopedics", Available = true },
                new Doctor { Id = 3, Name = "Dr. Rodriguez", Specialization = "Neurology", Available = true },
                new Doctor { Id = 4, Name = "Dr. Kim", Specialization = "Pediatrics", Available = true },
                new Doctor { Id = 5, Name = "Dr. Johnson", Specialization = "Dermatology", Available = false }
            };
        }

        private List<string> GetAvailableTimeSlots()
        {
            return new List<string>
            {
                "09:00 AM",
                "09:30 AM",
                "10:00 AM",
                "10:30 AM",
                "11:00 AM",
                "02:00 PM",
                "02:30 PM",
                "03:00 PM",
                "03:30 PM",
                "04:00 PM"
            };
        }

        private List<string> GetDepartments()
        {
            return new List<string>
            {
                "Cardiology",
                "Orthopedics",
                "Neurology",
                "Pediatrics",
                "Dermatology",
                "General Medicine",
                "Oncology",
                "Psychiatry"
            };
        }

        private List<Prescription> GetPatientPrescriptions(int patientId)
        {
            return new List<Prescription>
            {
                new Prescription 
                { 
                    Id = 1, 
                    MedicineName = "Aspirin", 
                    Dosage = "500mg", 
                    Frequency = "Twice daily", 
                    Duration = "10 days",
                    IssuedDate = DateTime.Now.AddDays(-5),
                    DoctorName = "Dr. Williams",
                    Status = "Active"
                },
                new Prescription 
                { 
                    Id = 2, 
                    MedicineName = "Amoxicillin", 
                    Dosage = "250mg", 
                    Frequency = "Three times daily", 
                    Duration = "7 days",
                    IssuedDate = DateTime.Now.AddDays(-15),
                    DoctorName = "Dr. Taylor",
                    Status = "Expired"
                },
                new Prescription 
                { 
                    Id = 3, 
                    MedicineName = "Lisinopril", 
                    Dosage = "10mg", 
                    Frequency = "Once daily", 
                    Duration = "30 days",
                    IssuedDate = DateTime.Now.AddDays(-2),
                    DoctorName = "Dr. Rodriguez",
                    Status = "Active"
                }
            };
        }

        private Prescription GetPrescriptionById(int id)
        {
            var prescriptions = GetPatientPrescriptions(1);
            return prescriptions.FirstOrDefault(p => p.Id == id);
        }

        private List<Patient> GetRecentPatients()
        {
            return new List<Patient>
            {
                new Patient { Id = 1, Name = "John Smith", Age = 45, Gender = "Male", BloodType = "A+", LastVisit = DateTime.Now.AddDays(-2), Status = "Active", ProfileImage = "https://i.pravatar.cc/150?img=1" },
                new Patient { Id = 2, Name = "Sarah Johnson", Age = 32, Gender = "Female", BloodType = "O-", LastVisit = DateTime.Now.AddDays(-1), Status = "Active", ProfileImage = "https://i.pravatar.cc/150?img=5" },
                new Patient { Id = 3, Name = "Robert Brown", Age = 58, Gender = "Male", BloodType = "B+", LastVisit = DateTime.Now.AddDays(-3), Status = "Critical", ProfileImage = "https://i.pravatar.cc/150?img=7" },
                new Patient { Id = 4, Name = "Emma Wilson", Age = 29, Gender = "Female", BloodType = "AB+", LastVisit = DateTime.Now.AddDays(-5), Status = "Active", ProfileImage = "https://i.pravatar.cc/150?img=8" }
            };
        }

        private List<Appointment> GetUpcomingAppointments()
        {
            return new List<Appointment>
            {
                new Appointment { Id = 1, PatientName = "John Smith", AppointmentTime = DateTime.Now.AddHours(2), DoctorName = "Dr. Williams", Department = "Cardiology", Status = "Scheduled" },
                new Appointment { Id = 2, PatientName = "Sarah Johnson", AppointmentTime = DateTime.Now.AddHours(3), DoctorName = "Dr. Taylor", Department = "Orthopedics", Status = "Scheduled" },
                new Appointment { Id = 3, PatientName = "Michael Chen", AppointmentTime = DateTime.Now.AddHours(4), DoctorName = "Dr. Rodriguez", Department = "Neurology", Status = "Scheduled" },
                new Appointment { Id = 4, PatientName = "Lisa Wong", AppointmentTime = DateTime.Now.AddHours(5), DoctorName = "Dr. Kim", Department = "Pediatrics", Status = "Scheduled" }
            };
        }

        private List<Patient> GetCriticalPatients()
        {
            return new List<Patient>
            {
                new Patient { Id = 3, Name = "Robert Brown", Age = 58, Gender = "Male", BloodType = "B+", LastVisit = DateTime.Now.AddDays(-3), Status = "Critical", ProfileImage = "https://i.pravatar.cc/150?img=7" },
                new Patient { Id = 5, Name = "David Miller", Age = 67, Gender = "Male", BloodType = "A-", LastVisit = DateTime.Now.AddDays(-1), Status = "Critical", ProfileImage = "https://i.pravatar.cc/150?img=12" }
            };
        }

        private Dictionary<string, int> GetDepartmentStats()
        {
            return new Dictionary<string, int>
            {
                { "Cardiology", 245 },
                { "Orthopedics", 189 },
                { "Neurology", 156 },
                { "Pediatrics", 312 },
                { "Dermatology", 134 },
                { "Oncology", 98 }
            };
        }

        private Dictionary<string, int> GetMonthlyVisits()
        {
            return new Dictionary<string, int>
            {
                { "Jan", 1200 },
                { "Feb", 1350 },
                { "Mar", 1420 },
                { "Apr", 1280 },
                { "May", 1560 },
                { "Jun", 1780 },
                { "Jul", 1650 },
                { "Aug", 1890 },
                { "Sep", 1750 },
                { "Oct", 1920 },
                { "Nov", 1850 },
                { "Dec", 2100 }
            };
        }
    }
}