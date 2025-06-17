using Microsoft.AspNetCore.Mvc;

namespace ProductManagement.Controllers
{
    public class DashboardController : Controller
    {
        private readonly ILogger<DashboardController> _logger;

        public DashboardController(ILogger<DashboardController> logger)
        {
            _logger = logger;
        }

        // GET: Dashboard
        public IActionResult Index()
        {
            try
            {
                // You can add server-side data here if needed
                ViewData["Title"] = "Developer Dashboard";

                // Example: Pass server-side data to the view
                ViewBag.ServerTime = DateTime.Now;
                ViewBag.ProjectName = "Product Management System";
                ViewBag.CompletionStatus = "Completed";

                return View();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading dashboard");
                return View("Error");
            }
        }

        // API endpoint for dashboard data (optional)
        [HttpGet]
        public IActionResult GetDashboardData()
        {
            try
            {
                var dashboardData = new
                {
                    ProjectName = "Product Management System",
                    Status = "Completed",
                    CompletionDate = "2025-06-16",
                    Deadline = "2025-06-18",
                    CodeQuality = 92,
                    TechStack = new[] { "ASP.NET Core", "Dapper", "MSSQL Server", "Bootstrap 5", "jQuery", "HTML5", "CSS3" },
                    Features = new[]
                    {
                        new { Name = "Product CRUD Operations", Completed = true, Complexity = "Medium" },
                        new { Name = "Database Integration", Completed = true, Complexity = "Medium" },
                        new { Name = "Responsive UI Design", Completed = true, Complexity = "Easy" },
                        new { Name = "Form Validation", Completed = true, Complexity = "Easy" },
                        new { Name = "Error Handling", Completed = true, Complexity = "Medium" },
                        new { Name = "Clean Architecture", Completed = true, Complexity = "Hard" }
                    }
                };

                return Json(dashboardData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving dashboard data");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
