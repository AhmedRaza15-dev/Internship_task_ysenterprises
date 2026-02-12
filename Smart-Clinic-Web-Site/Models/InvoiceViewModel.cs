using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Smart_Clinic_Web_site.Models
{
    public class InvoiceViewModel
    {
        [Required]
        public string InvoiceNumber { get; set; }

        [Required]
        [Display(Name = "Issue Date")]
        [DataType(DataType.Date)]
        public DateTime IssueDate { get; set; }

        [Required]
        [Display(Name = "Due Date")]
        [DataType(DataType.Date)]
        public DateTime DueDate { get; set; }

        [Required]
        public int PatientId { get; set; }

        [Display(Name = "Patient Name")]
        public string PatientName { get; set; }

        [Required]
        public List<InvoiceItemViewModel> Items { get; set; } = new List<InvoiceItemViewModel>();

        public string Notes { get; set; }
    }

    public class InvoiceItemViewModel
    {
        [Required]
        public string Description { get; set; }

        [Required]
        public string Category { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Unit price must be greater than 0")]
        public decimal UnitPrice { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1")]
        public int Quantity { get; set; }

        public decimal Amount => UnitPrice * Quantity;
    }
}
