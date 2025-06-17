// Product Management JavaScript Functions

const $ = window.jQuery // Declare the $ variable

$(document).ready(() => {
    // Auto-hide alerts after 5 seconds
    setTimeout(() => {
        $(".alert").fadeOut("slow")
    }, 5000)

    // Confirm delete actions
    $('.btn-danger[href*="Delete"]').on("click", function (e) {
        var productName = $(this).closest("tr").find("td:nth-child(2)").text()
        if (!confirm('Are you sure you want to delete "' + productName + '"? This action cannot be undone.')) {
            e.preventDefault()
        }
    })

    // Form validation helpers
    function validateProductForm() {
        var isValid = true

        // Clear previous errors
        $(".custom-error").remove()
        $(".is-invalid").removeClass("is-invalid")

        // Validate name
        var nameField = $('input[name="Name"]')
        var name = nameField.val().trim()
        if (!name) {
            showFieldError(nameField, "Product name is required")
            isValid = false
        } else if (name.length > 255) {
            showFieldError(nameField, "Product name cannot exceed 255 characters")
            isValid = false
        }

        // Validate price
        var priceField = $('input[name="Price"]')
        var price = Number.parseFloat(priceField.val())
        if (!price || price <= 0) {
            showFieldError(priceField, "Price must be greater than 0")
            isValid = false
        }

        // Validate description
        var descField = $('textarea[name="Description"]')
        var description = descField.val()
        if (description && description.length > 500) {
            showFieldError(descField, "Description cannot exceed 500 characters")
            isValid = false
        }

        return isValid
    }

    function showFieldError(field, message) {
        field.addClass("is-invalid")
        field.after('<div class="text-danger custom-error small mt-1">' + message + "</div>")
    }

    // Real-time validation
    $('input[name="Name"]').on("input", function () {
        var name = $(this).val().trim()
        $(this).removeClass("is-invalid")
        $(this).siblings(".custom-error").remove()

        if (name.length > 255) {
            showFieldError($(this), "Product name cannot exceed 255 characters")
        }
    })

    $('input[name="Price"]').on("input", function () {
        var price = Number.parseFloat($(this).val())
        $(this).removeClass("is-invalid")
        $(this).siblings(".custom-error").remove()

        if ($(this).val() && (isNaN(price) || price <= 0)) {
            showFieldError($(this), "Price must be greater than 0")
        }
    })

    $('textarea[name="Description"]').on("input", function () {
        var description = $(this).val()
        $(this).removeClass("is-invalid")
        $(this).siblings(".custom-error").remove()

        if (description.length > 500) {
            showFieldError($(this), "Description cannot exceed 500 characters")
        }
    })

    // Loading states for form submissions
    $("form").on("submit", function () {
        var submitBtn = $(this).find('button[type="submit"]')
        var originalText = submitBtn.html()

        submitBtn.prop("disabled", true)
        submitBtn.html('<i class="fas fa-spinner fa-spin me-2"></i>Processing...')

        // Re-enable after 3 seconds in case of errors
        setTimeout(() => {
            submitBtn.prop("disabled", false)
            submitBtn.html(originalText)
        }, 3000)
    })

    // Smooth scrolling for validation errors
    if ($(".text-danger").length > 0) {
        $("html, body").animate(
            {
                scrollTop: $(".text-danger").first().offset().top - 100,
            },
            500,
        )
    }

    // Table row hover effects
    $(".table tbody tr").hover(
        function () {
            $(this).addClass("table-active")
        },
        function () {
            $(this).removeClass("table-active")
        },
    )

    // Tooltip initialization for action buttons
    $("[title]").tooltip()

    // Format currency inputs
    $('input[name="Price"]').on("blur", function () {
        var value = Number.parseFloat($(this).val())
        if (!isNaN(value) && value > 0) {
            $(this).val(value.toFixed(2))
        }
    })

    // Character counter for description
    $('textarea[name="Description"]').on("input", function () {
        var maxLength = 500
        var currentLength = $(this).val().length
        var remaining = maxLength - currentLength

        // Remove existing counter
        $(this).siblings(".char-counter").remove()

        // Add counter
        var counterClass = remaining < 50 ? "text-warning" : remaining < 20 ? "text-danger" : "text-muted"
        $(this).after(
            '<div class="char-counter small ' + counterClass + ' mt-1">' + remaining + " characters remaining</div>",
        )
    })
})

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount)
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}

// Export functions for global use
window.ProductManagement = {
    formatCurrency: formatCurrency,
    formatDate: formatDate,
}
