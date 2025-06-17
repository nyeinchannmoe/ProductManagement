// Dashboard Manager
const DashboardManager = {
    // Data
    data: {
        skills: [
            { skill: "ASP.NET Core", level: 85, category: "Backend" },
            { skill: "C#", level: 88, category: "Programming" },
            { skill: "Dapper ORM", level: 80, category: "Database" },
            { skill: "MSSQL Server", level: 82, category: "Database" },
            { skill: "HTML/CSS", level: 90, category: "Frontend" },
            { skill: "JavaScript/jQuery", level: 85, category: "Frontend" },
            { skill: "Bootstrap", level: 88, category: "UI Framework" },
            { skill: "Git/GitHub", level: 85, category: "Version Control" },
        ],
        features: [
            { name: "Product CRUD Operations", completed: true, complexity: "Medium" },
            { name: "Database Integration", completed: true, complexity: "Medium" },
            { name: "Responsive UI Design", completed: true, complexity: "Easy" },
            { name: "Form Validation", completed: true, complexity: "Easy" },
            { name: "Error Handling", completed: true, complexity: "Medium" },
            { name: "Clean Architecture", completed: true, complexity: "Hard" },
        ],
        achievements: [
            {
                title: "Assignment Completed",
                description: "Successfully completed ASP.NET Core assignment",
                date: "2025-01-17",
                icon: "fas fa-trophy",
            },
            {
                title: "Early Submission",
                description: "Completed 2 days ahead of deadline",
                date: "2025-01-17",
                icon: "fas fa-clock",
            },
            {
                title: "Clean Code",
                description: "Maintained 92% code quality score",
                date: "2025-01-17",
                icon: "fas fa-code",
            },
            {
                title: "Full Stack",
                description: "Demonstrated full-stack development skills",
                date: "2025-01-17",
                icon: "fas fa-bolt",
            },
        ],
    },

    // Initialize dashboard
    init: function () {
        this.updateCurrentTime()
        this.initializeTabs()
        this.populateSkills()
        this.populateFeatures()
        this.populateAchievements()
        this.animateProgressBars()
        this.calculateDaysAhead()

        // Set up intervals
        setInterval(() => this.updateCurrentTime(), 1000)

        console.log("Dashboard initialized successfully!")
    },

    // Update current time
    updateCurrentTime: () => {
        const now = new Date()
        const timeString = now.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        })

        const timeElement = document.getElementById("currentTime")
        if (timeElement) {
            timeElement.textContent = timeString
        }
    },

    // Initialize tabs functionality
    initializeTabs: () => {
        const tabButtons = document.querySelectorAll(".tab-button")
        const tabContents = document.querySelectorAll(".tab-content")

        tabButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const targetTab = button.getAttribute("data-tab")

                // Remove active class from all buttons and contents
                tabButtons.forEach((btn) => btn.classList.remove("active"))
                tabContents.forEach((content) => content.classList.remove("active"))

                // Add active class to clicked button and corresponding content
                button.classList.add("active")
                const targetContent = document.getElementById(targetTab)
                if (targetContent) {
                    targetContent.classList.add("active")
                    targetContent.classList.add("fade-in")
                }
            })
        })
    },

    // Populate skills section
    populateSkills: function () {
        const skillsList = document.getElementById("skillsList")
        if (!skillsList) return

        let skillsHTML = ""
        this.data.skills.forEach((skill) => {
            skillsHTML += `
                <div class="skill-item slide-in">
                    <div class="skill-header">
                        <div class="d-flex align-items-center gap-2">
                            <span class="skill-name">${skill.skill}</span>
                            <span class="skill-category">${skill.category}</span>
                        </div>
                        <span class="skill-percentage">${skill.level}%</span>
                    </div>
                    <div class="skill-progress">
                        <div class="skill-progress-fill" data-width="${skill.level}"></div>
                    </div>
                </div>
            `
        })

        skillsList.innerHTML = skillsHTML
    },

    // Populate features section
    populateFeatures: function () {
        const featuresList = document.getElementById("featuresList")
        if (!featuresList) return

        let featuresHTML = ""
        this.data.features.forEach((feature) => {
            const complexityClass = `complexity-${feature.complexity.toLowerCase()}`
            featuresHTML += `
                <div class="feature-item slide-in">
                    <div class="feature-info">
                        <i class="fas fa-check-circle feature-check"></i>
                        <span class="fw-medium">${feature.name}</span>
                    </div>
                    <div class="feature-badges">
                        <span class="badge ${complexityClass}">${feature.complexity}</span>
                        <span class="badge badge-success">Completed</span>
                    </div>
                </div>
            `
        })

        featuresList.innerHTML = featuresHTML
    },

    // Populate achievements section
    populateAchievements: function () {
        const achievementsGrid = document.getElementById("achievementsGrid")
        if (!achievementsGrid) return

        let achievementsHTML = ""
        this.data.achievements.forEach((achievement) => {
            achievementsHTML += `
                <div class="achievement-card slide-in">
                    <div class="achievement-content">
                        <div class="achievement-icon">
                            <i class="${achievement.icon}"></i>
                        </div>
                        <div class="flex-1">
                            <h3 class="achievement-title">${achievement.title}</h3>
                            <p class="achievement-desc">${achievement.description}</p>
                            <p class="achievement-date">${achievement.date}</p>
                        </div>
                    </div>
                </div>
            `
        })

        achievementsGrid.innerHTML = achievementsHTML
    },

    // Animate progress bars
    animateProgressBars: () => {
        setTimeout(() => {
            // Animate skill progress bars
            const skillProgressBars = document.querySelectorAll(".skill-progress-fill")
            skillProgressBars.forEach((bar) => {
                const width = bar.getAttribute("data-width")
                bar.style.width = width + "%"
            })

            // Animate main progress bar
            const mainProgressBar = document.querySelector(".progress-fill")
            if (mainProgressBar) {
                mainProgressBar.style.width = "100%"
            }
        }, 500)
    },

    // Calculate days ahead
    calculateDaysAhead: () => {
        const completionDate = new Date("2025-06-16")
        const deadlineDate = new Date("2025-06-18")
        const timeDiff = deadlineDate.getTime() - completionDate.getTime()
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))

        const daysAheadElement = document.getElementById("daysAhead")
        if (daysAheadElement) {
            daysAheadElement.textContent = daysDiff
        }
    },

    // Utility functions
    formatDate: (dateString) =>
        new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }),

    // Add smooth scrolling to sections
    scrollToSection: (sectionId) => {
        const section = document.getElementById(sectionId)
        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }
    },

    // Export dashboard data (for future use)
    exportData: function () {
        const dashboardData = {
            exportDate: new Date().toISOString(),
            projectStatus: "Completed",
            completionDate: "2025-01-17",
            codeQuality: 92,
            skills: this.data.skills,
            features: this.data.features,
            achievements: this.data.achievements,
        }

        console.log("Dashboard Data:", dashboardData)
        return dashboardData
    },
}

// Additional utility functions
function animateCountUp(element, target, duration = 2000) {
    let start = 0
    const increment = target / (duration / 16)

    const timer = setInterval(() => {
        start += increment
        element.textContent = Math.floor(start)

        if (start >= target) {
            element.textContent = target
            clearInterval(timer)
        }
    }, 16)
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Add loading animation
    document.body.classList.add("fade-in")

    // Initialize tooltips if Bootstrap is available
    const bootstrap = window.bootstrap // Declare the bootstrap variable
    if (typeof bootstrap !== "undefined") {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))
    }
})

// Export for global access
window.DashboardManager = DashboardManager
