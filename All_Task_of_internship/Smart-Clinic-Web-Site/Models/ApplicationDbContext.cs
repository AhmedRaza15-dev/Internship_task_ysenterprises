using System.Collections.Generic;

namespace Smart_Clinic_Web_site.Models
{
    /// <summary>
    /// Simple in-memory stand-in for a real DbContext to allow compilation
    /// and local testing without EF Core configured. This should be replaced
    /// with a proper DbContext implementation for production.
    /// </summary>
    public class ApplicationDbContext
    {
        public List<Invoice> Invoices { get; } = new List<Invoice>();
        public List<Patient> Patients { get; } = new List<Patient>();
        public List<Doctor> Doctors { get; } = new List<Doctor>();
        public List<ApplicationUser> Users { get; } = new List<ApplicationUser>();

        public void SaveChanges()
        {
            // No-op for in-memory store
        }
    }
}
