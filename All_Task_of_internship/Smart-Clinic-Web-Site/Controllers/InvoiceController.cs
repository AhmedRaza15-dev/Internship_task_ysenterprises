using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Smart_Clinic_Web_site.Models;
using Rotativa.AspNetCore;

namespace Smart_Clinic_Web_site.Controllers
{
    public class InvoiceController : Controller
    {
        private readonly ApplicationDbContext _context;

        public InvoiceController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Invoice/Create
        public IActionResult Create(int patientId = 1)
        {
            // Retrieve the general Patient entity from the in-memory context
            var patientEntity = _context.Patients.FirstOrDefault(p => p.Id == patientId);
            if (patientEntity == null)
            {
                // Create a sample general patient for testing (uses Patient model from Patient.cs)
                patientEntity = new Patient
                {
                    Id = patientId,
                    Name = $"Sample Patient {patientId}",
                    Age = 0,
                    Gender = string.Empty,
                    BloodType = string.Empty,
                    LastVisit = DateTime.Now,
                    Status = "Active",
                    ProfileImage = string.Empty
                };
                _context.Patients.Add(patientEntity);
                _context.SaveChanges();
            }

            // Map general Patient to an Invoice-specific patient representation used by Invoice model/view
            var invoicePatient = new InvoicePatient
            {
                Id = patientEntity.Id,
                FullName = patientEntity.Name,
                Email = string.Empty,
                PhoneNumber = string.Empty,
                Address = string.Empty,
                MedicalRecordNumber = $"MRN-{patientId:D5}"
            };

            var model = new InvoiceViewModel
            {
                PatientId = patientId,
                PatientName = invoicePatient.FullName,
                InvoiceNumber = GenerateInvoiceNumber(),
                IssueDate = DateTime.Now,
                DueDate = DateTime.Now.AddDays(30),
                Items = new List<InvoiceItemViewModel>()
            };

            ViewBag.Categories = new SelectList(new[]
            {
                "Hospital Fee",
                "Lab Test",
                "Consultation",
                "Medication",
                "Procedure",
                "Radiology"
            });

            return View(model);
        }

        // POST: Invoice/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(InvoiceViewModel model)
        {
            if (ModelState.IsValid)
            {
                var invoice = new Invoice
                {
                    InvoiceNumber = model.InvoiceNumber,
                    IssueDate = model.IssueDate,
                    DueDate = model.DueDate,
                    PatientId = model.PatientId,
                    CashierId = "system-user",
                    Status = "Pending",
                    Notes = model.Notes,
                    Items = model.Items.Select(i => new InvoiceItem
                    {
                        Description = i.Description,
                        Category = i.Category,
                        UnitPrice = i.UnitPrice,
                        Quantity = i.Quantity
                    }).ToList()
                };

                _context.Invoices.Add(invoice);
                _context.SaveChanges();

                TempData["SuccessMessage"] = "Invoice created successfully!";
                return RedirectToAction("Details", new { id = invoice.Id });
            }

            ViewBag.Categories = new SelectList(new[]
            {
                "Hospital Fee",
                "Lab Test",
                "Consultation",
                "Medication",
                "Procedure",
                "Radiology"
            });

            return View(model);
        }

        // GET: Invoice/Index - List all invoices
        public IActionResult Index()
        {
            var invoices = _context.Invoices.ToList();
            return View(invoices);
        }

        // GET: Invoice/Details/{id}
        public IActionResult Details(int id)
        {
            var invoice = _context.Invoices.FirstOrDefault(i => i.Id == id);
            if (invoice == null)
            {
                return NotFound();
            }
            return View(invoice);
        }

        // PDF Export
        public IActionResult DownloadPdf(int id)
        {
            var invoice = _context.Invoices.FirstOrDefault(i => i.Id == id);
            if (invoice == null)
            {
                return NotFound();
            }
            // Rotativa uses wkhtmltopdf.exe under wwwroot/Rotativa by default. If the executable
            // is missing the MVC pipeline will throw when executing the ActionResult. Detect
            // the file here and provide a graceful fallback to avoid an unhandled exception.
            try
            {
                var wkPath = System.IO.Path.Combine(System.IO.Directory.GetCurrentDirectory(), "wwwroot", "Rotativa", "wkhtmltopdf.exe");
                if (!System.IO.File.Exists(wkPath))
                {
                    TempData["PdfError"] = "PDF generator not found. Please install wkhtmltopdf and place 'wkhtmltopdf.exe' in wwwroot/Rotativa or install wkhtmltopdf on the server.";
                    return RedirectToAction("Details", new { id = id });
                }

                return new ViewAsPdf("InvoicePdf", invoice)
                {
                    FileName = $"Invoice-{invoice.InvoiceNumber}.pdf",
                    PageSize = Rotativa.AspNetCore.Options.Size.A4,
                    PageOrientation = Rotativa.AspNetCore.Options.Orientation.Portrait,
                    CustomSwitches = "--print-media-type"
                };
            }
            catch (System.Exception ex)
            {
                TempData["PdfError"] = "PDF generation failed: " + ex.Message;
                return RedirectToAction("Details", new { id = id });
            }
        }

        private string GenerateInvoiceNumber()
        {
            var year = DateTime.Now.Year;
            var month = DateTime.Now.Month.ToString("D2");
            var sequence = _context.Invoices.Count + 1;
            return $"INV-{year}{month}-{sequence.ToString("D5")}";
        }
    }
}