namespace Smart_Clinic_Web_site.Models
{
    public class Patient
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public string BloodType { get; set; }
        public DateTime LastVisit { get; set; }
        public string Status { get; set; } // "Active", "Inactive", "Critical"
        public string ProfileImage { get; set; }
    }

    public class Appointment
    {
        public int Id { get; set; }
        public string PatientName { get; set; }
        public DateTime AppointmentTime { get; set; }
        public string DoctorName { get; set; }
        public string Department { get; set; }
        public string Status { get; set; } // "Scheduled", "Completed", "Cancelled"
    }

    public class DashboardViewModel
    {
        public int TotalPatients { get; set; }
        public int TodayAppointments { get; set; }
        public int TotalDoctors { get; set; }
        public int AvailableRooms { get; set; }
        public List<Patient> RecentPatients { get; set; }
        public List<Appointment> UpcomingAppointments { get; set; }
        public List<Patient> CriticalPatients { get; set; }
        public Dictionary<string, int> DepartmentStats { get; set; }
        public Dictionary<string, int> MonthlyVisits { get; set; }
    }
}