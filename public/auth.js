// Login Form Handler
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm")
  const registerForm = document.getElementById("registerForm")

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }

  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister)
  }
})

async function handleLogin(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
  }

  try {
    showLoading()

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })

    const data = await response.json()

    if (response.ok) {
      // Store token and user data
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      showAlert("Login successful! Redirecting...", "success")

      // Redirect to main
      setTimeout(() => {
        window.location.href = "/main"
      }, 1500)
    } else {
      showAlert(data.message || "Login failed", "error")
    }
  } catch (error) {
    console.error("Login error:", error)
    showAlert("Network error. Please try again.", "error")
  } finally {
    hideLoading()
  }
}

async function handleRegister(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const password = formData.get("password")
  const confirmPassword = formData.get("confirmPassword")

  // Validate passwords match
  if (password !== confirmPassword) {
    showAlert("Passwords do not match", "error")
    return
  }

  const registerData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    location: formData.get("location"),
    role: formData.get("role"),
    password: password,
  }

  try {
    showLoading()

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    })

    const data = await response.json()

    if (response.ok) {
      // Store token and user data
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      showAlert("Registration successful! Redirecting...", "success")

      // Redirect to main
      setTimeout(() => {
        window.location.href = "/main"
      }, 1500)
    } else {
      showAlert(data.message || "Registration failed", "error")
    }
  } catch (error) {
    console.error("Registration error:", error)
    showAlert("Network error. Please try again.", "error")
  } finally {
    hideLoading()
  }
}

// Utility functions for auth pages
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

  const form = document.querySelector(".auth-form")
  form.parentNode.insertBefore(alertDiv, form)

  setTimeout(() => {
    alertDiv.remove()
  }, 5000)
}
