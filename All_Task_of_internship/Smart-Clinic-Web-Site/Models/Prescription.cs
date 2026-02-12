namespace Smart_Clinic_Web_site.Models
{
    public class Prescription
    {
        public int Id { get; set; }
        public string MedicineName { get; set; }
        public string Dosage { get; set; }
        public string Frequency { get; set; }
        public string Duration { get; set; }
        public DateTime IssuedDate { get; set; }
        public string DoctorName { get; set; }
        public string Status { get; set; } // "Active", "Expired", "Completed"
    }
}
