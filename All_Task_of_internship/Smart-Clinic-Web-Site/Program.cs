using System.Linq;
using System.Collections.Generic;
using Smart_Clinic_Web_site.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllersWithViews().AddRazorRuntimeCompilation();

// Register ApplicationDbContext as a singleton for dependency injection
builder.Services.AddSingleton<Smart_Clinic_Web_site.Models.ApplicationDbContext>();

var app = builder.Build();

// Seed a sample invoice in the in-memory ApplicationDbContext so sample links work
try
{
    var db = app.Services.GetRequiredService<ApplicationDbContext>();
    if (!db.Invoices.Any())
    {
        db.Invoices.Add(new Invoice
        {
            Id = 1,
            InvoiceNumber = "INV-" + DateTime.Now.ToString("yyyyMM") + "-00001",
            IssueDate = DateTime.Now,
            DueDate = DateTime.Now.AddDays(30),
            PatientId = 1,
            Patient = new InvoicePatient
            {
                Id = 1,
                FullName = "Sample Patient 1",
                Email = "sample1@example.com",
                PhoneNumber = "(555) 000-0001",
                Address = "123 Example St",
                MedicalRecordNumber = "MRN-00001"
            },
            CashierId = "system-user",
            Status = "Pending",
            Notes = "Sample invoice created at startup",
            Items = new List<InvoiceItem>
            {
                new InvoiceItem { Id = 1, Description = "Sample Consultation", UnitPrice = 50m, Quantity = 1, Category = "Consultation" }
            }
        });
    }
}
catch
{
    // ignore seeding errors in environments without DI available
}

// Configure the HTTP request pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

// Initialize Rotativa
Rotativa.AspNetCore.RotativaConfiguration.Setup(app.Environment.WebRootPath);

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
