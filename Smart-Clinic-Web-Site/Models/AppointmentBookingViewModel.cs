namespace Smart_Clinic_Web_site.Models
{
    public class AppointmentBookingViewModel
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public string SelectedDoctorName { get; set; }
        public string Department { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string TimeSlot { get; set; }
        public string Reason { get; set; }
        public string Notes { get; set; }
        
        // For dropdown lists
        public List<Doctor> AvailableDoctors { get; set; }
        public List<string> AvailableTimeSlots { get; set; }
        public List<string> Departments { get; set; }
    }
}
