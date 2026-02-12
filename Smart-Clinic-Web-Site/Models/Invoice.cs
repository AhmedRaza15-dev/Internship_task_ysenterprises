using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Smart_Clinic_Web_site.Models
{
    public class Invoice
    {
        public int Id { get; set; }
        
        [Required]
        public string InvoiceNumber { get; set; }
        
        [Required]
        public DateTime IssueDate { get; set; }
        
        [Required]
        public DateTime DueDate { get; set; }
        
        [Required]
        public int PatientId { get; set; }
        public InvoicePatient Patient { get; set; }
        
        [Required]
        public string CashierId { get; set; }
        public ApplicationUser Cashier { get; set; }
        
        public List<InvoiceItem> Items { get; set; }
        
        [Required]
        public string Status { get; set; } // Pending, Paid, Cancelled
        
        public string PaymentMethod { get; set; }
        public DateTime? PaymentDate { get; set; }
        public string Notes { get; set; }
        
        public decimal SubTotal => Items?.Sum(i => i.Amount) ?? 0;
        public decimal TaxAmount => SubTotal * 0.1m; // 10% tax
        public decimal TotalAmount => SubTotal + TaxAmount;
    }

    public class InvoiceItem
    {
        public int Id { get; set; }
        
        [Required]
        public string Description { get; set; }
        
        [Required]
        public decimal UnitPrice { get; set; }
        
        [Required]
        public int Quantity { get; set; }
        
        public decimal Amount => UnitPrice * Quantity;
        
        [Required]
        public string Category { get; set; } // HospitalFee, LabTest, Consultation, Medication
    }

    public class InvoicePatient
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string MedicalRecordNumber { get; set; }
    }
}