document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm")
  
    if (contactForm) {
      contactForm.addEventListener("submit", handleContactForm)
    }
  })
  
  async function handleContactForm(e) {
    e.preventDefault()
  
    const formData = new FormData(e.target)
    const contactData = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    }
  
    try {
      showLoading()
  
      // Simulate form submission (in a real app, this would send to your backend)
      await new Promise((resolve) => setTimeout(resolve, 2000))
  
      showAlert("Thank you for your message! We'll get back to you within 24 hours.", "success")
      e.target.reset()
    } catch (error) {
      console.error("Contact form error:", error)
      showAlert("Failed to send message. Please try again or contact us directly.", "error")
    } finally {
      hideLoading()
    }
  }
  
  function showLoading() {
    const loading = document.getElementById("loading")
    if (loading) {
      loading.classList.remove("hidden")
    }
  }
  
  function hideLoading() {
    const loading = document.getElementById("loading")
    if (loading) {
      loading.classList.add("hidden")
    }
  }
  
  function showAlert(message, type = "info") {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll(".alert")
    existingAlerts.forEach((alert) => alert.remove())
  
    const alertDiv = document.createElement("div")
    alertDiv.className = `alert alert-${type}`
    alertDiv.textContent = message
  
    const form = document.querySelector(".contact-form")
    form.parentNode.insertBefore(alertDiv, form)
  
    setTimeout(() => {
      alertDiv.remove()
    }, 5000)
  }
  