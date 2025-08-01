// Utility functions
const isAuthenticated = () => localStorage.getItem("token") !== null
const getCurrentUser = () => JSON.parse(localStorage.getItem("user") || "{}")
const showLoading = (show) => {
  const loading = document.getElementById("loading")
  if (loading) {
    if (show) {
      loading.classList.remove("hidden")
    } else {
      loading.classList.add("hidden")
    }
  }
}
const hideLoading = () => document.getElementById("loading")?.classList.add("hidden")
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
const formatCurrency = (amount) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token")
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  }

  if (config.body && typeof config.body === "object") {
    config.body = JSON.stringify(config.body)
  }

  try {
    const response = await fetch(`/api${endpoint}`, config)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong")
    }

    return data
  } catch (error) {
    console.error("API Request Error:", error)
    throw error
  }
}

const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  window.location.href = "/login"
}

const showAlert = (message, type = "info") => {
  // Remove existing alerts
  const existingAlerts = document.querySelectorAll(".alert")
  existingAlerts.forEach((alert) => alert.remove())

  // Create new alert
  const alert = document.createElement("div")
  alert.className = `alert alert-${type}`
  alert.textContent = message

  // Add to page
  document.body.appendChild(alert)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (alert.parentNode) {
      alert.remove()
    }
  }, 5000)
}

function showError(message) {
  showAlert(message, "error")
}

// Main page functionality
let currentUser = null

// Initialize the main page
document.addEventListener("DOMContentLoaded", () => {
  console.log("Main page loaded, checking authentication...")
  checkAuth()
})

// Check if user is authenticated
function checkAuth() {
  const token = localStorage.getItem("token")
  if (!token) {
    console.log("No token found, redirecting to login")
    window.location.href = "/login"
    return
  }

  console.log("Token found, verifying with server...")

  fetch("/api/auth/verify", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log("Auth verification response:", response.status)
      if (!response.ok) {
        throw new Error("Token invalid")
      }
      return response.json()
    })
    .then((data) => {
      console.log("Auth verification successful:", data)
      currentUser = data.user
      localStorage.setItem("user", JSON.stringify(data.user))
      updateUserInterface()
      loadDashboardData()
    })
    .catch((error) => {
      console.error("Auth check failed:", error)
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
    })
}

// Update user interface based on user role
function updateUserInterface() {
  if (!currentUser) return

  console.log("Updating UI for user:", currentUser.name, "Role:", currentUser.role)

  // Update greeting
  const greeting = document.getElementById("userGreeting")
  if (greeting) {
    greeting.textContent = `Welcome, ${currentUser.name}!`
  }

  // Update welcome title and message
  const welcomeTitle = document.getElementById("welcomeTitle")
  const welcomeMessage = document.getElementById("welcomeMessage")

  if (welcomeTitle && welcomeMessage) {
    if (currentUser.role === "farmer") {
      welcomeTitle.textContent = `Welcome back, ${currentUser.name}!`
      welcomeMessage.textContent = "Ready to list your agricultural waste and connect with buyers?"
    } else {
      welcomeTitle.textContent = `Welcome back, ${currentUser.name}!`
      welcomeMessage.textContent = "Discover valuable agricultural waste for your business needs."
    }
  }

  // Populate hero buttons and actions based on role
  populateHeroButtons()
  populateQuickActions()
}

// Load dashboard data
function loadDashboardData() {
  console.log("Loading dashboard data...")
  const token = localStorage.getItem("token")

  if (!token) {
    console.error("No token available for API calls")
    return
  }

  // Load profile data first
  loadUserProfile()

  // Load all dashboard sections
  Promise.all([
    fetch("/api/dashboard/activity", { headers: { Authorization: `Bearer ${token}` } }),
    fetch("/api/dashboard/impact", { headers: { Authorization: `Bearer ${token}` } }),
    fetch("/api/dashboard/featured-listings", { headers: { Authorization: `Bearer ${token}` } }),
    fetch("/api/dashboard/transactions", { headers: { Authorization: `Bearer ${token}` } }),
    fetch("/api/dashboard/reviews", { headers: { Authorization: `Bearer ${token}` } }),
  ])
    .then((responses) => {
      console.log(
        "Dashboard API responses:",
        responses.map((r) => r.status),
      )
      return Promise.all(responses.map((r) => r.json()))
    })
    .then(([activity, impact, listings, transactions, reviews]) => {
      console.log("Dashboard data received:", { activity, impact, listings, transactions, reviews })

      populateActivity(activity.data || [])
      populateImpact(impact.data || {})
      populateFeaturedListings(listings.data || [])
      populateTransactions(transactions.data || [])
      populateReviews(reviews.data || [])
      populateWasteReuseSuggestions()
    })
    .catch((error) => {
      console.error("Error loading dashboard data:", error)
      showError("Failed to load dashboard data")
    })
}

// Load user profile data
function loadUserProfile() {
  const token = localStorage.getItem("token")

  fetch("/api/dashboard/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Profile data received:", data)
      if (data.success) {
        populateProfile(data.user)
        populateQuickStats(data.stats)
      }
    })
    .catch((error) => {
      console.error("Error loading user profile:", error)
    })
}

// Populate hero buttons based on user role
function populateHeroButtons() {
  const heroButtons = document.getElementById("heroButtons")
  if (!heroButtons || !currentUser) return

  let buttonsHTML = ""

  if (currentUser.role === "farmer") {
    buttonsHTML = `
      <button onclick="openModal('createListingModal')" class="btn btn-primary">
        <i class="fas fa-plus"></i> Create Listing
      </button>
      <a href="/dashboard" class="btn btn-secondary">
        <i class="fas fa-chart-bar"></i> View Dashboard
      </a>
    `
  } else {
    buttonsHTML = `
      <a href="/listings" class="btn btn-primary">
        <i class="fas fa-search"></i> Browse Listings
      </a>
      <a href="/dashboard" class="btn btn-secondary">
        <i class="fas fa-chart-bar"></i> View Dashboard
      </a>
    `
  }

  heroButtons.innerHTML = buttonsHTML
}

// Populate quick actions based on user role
function populateQuickActions() {
  const actionsGrid = document.getElementById("actionsGrid")
  if (!actionsGrid || !currentUser) return

  let actionsHTML = ""

  if (currentUser.role === "farmer") {
    actionsHTML = `
      <div class="action-card" onclick="openModal('createListingModal')">
        <div class="action-icon">
          <i class="fas fa-plus"></i>
        </div>
        <h3>Create New Listing</h3>
        <p>List your agricultural waste and connect with potential buyers.</p>
        <button class="btn btn-primary">Get Started</button>
      </div>
      <div class="action-card" onclick="window.location.href='/dashboard'">
        <div class="action-icon">
          <i class="fas fa-chart-line"></i>
        </div>
        <h3>View Analytics</h3>
        <p>Track your listings performance and earnings.</p>
        <button class="btn btn-primary">View Stats</button>
      </div>
      <div class="action-card" onclick="window.location.href='/listings'">
        <div class="action-icon">
          <i class="fas fa-list"></i>
        </div>
        <h3>Manage Listings</h3>
        <p>Edit, update, or remove your existing listings.</p>
        <button class="btn btn-primary">Manage</button>
      </div>
    `
  } else {
    actionsHTML = `
      <div class="action-card" onclick="window.location.href='/listings'">
        <div class="action-icon">
          <i class="fas fa-search"></i>
        </div>
        <h3>Browse Listings</h3>
        <p>Find agricultural waste that meets your business needs.</p>
        <button class="btn btn-primary">Browse Now</button>
      </div>
      <div class="action-card" onclick="window.location.href='/dashboard'">
        <div class="action-icon">
          <i class="fas fa-shopping-cart"></i>
        </div>
        <h3>My Requests</h3>
        <p>Track your purchase requests and transactions.</p>
        <button class="btn btn-primary">View Requests</button>
      </div>
      <div class="action-card" onclick="window.location.href='/contact'">
        <div class="action-icon">
          <i class="fas fa-handshake"></i>
        </div>
        <h3>Connect</h3>
        <p>Get in touch with farmers and expand your network.</p>
        <button class="btn btn-primary">Connect</button>
      </div>
    `
  }

  actionsGrid.innerHTML = actionsHTML
}

// Populate profile information
function populateProfile(user) {
  const profileCard = document.getElementById("profileCard")
  if (!profileCard) return

  const profileHTML = `
    <div class="profile-info">
      <div class="profile-avatar">
        <i class="fas fa-user-circle"></i>
      </div>
      <div class="profile-details">
        <h3>${user.name}</h3>
        <span class="profile-role">${capitalize(user.role)}</span>
        <p class="profile-location">
          <i class="fas fa-map-marker-alt"></i> ${user.location || "Location not set"}
        </p>
        <div class="profile-rating">
          ${generateStarRating(user.rating || 0)}
          <span class="rating-count">(${user.totalRatings || 0} reviews)</span>
        </div>
      </div>
    </div>
    <div class="profile-actions">
      <button onclick="window.location.href='/dashboard'" class="btn btn-primary">
        <i class="fas fa-edit"></i> Edit Profile
      </button>
      <button onclick="window.location.href='/contact'" class="btn btn-secondary">
        <i class="fas fa-envelope"></i> Contact
      </button>
    </div>
  `

  profileCard.innerHTML = profileHTML
}

// Populate quick stats
function populateQuickStats(stats) {
  const quickStats = document.getElementById("quickStats")
  if (!quickStats) return

  const statsHTML = `
    <div class="stat-item">
      <div class="stat-icon">
        <i class="fas fa-list"></i>
      </div>
      <div class="stat-content">
        <span class="stat-number">${stats.totalListings || 0}</span>
        <span class="stat-label">Total Listings</span>
      </div>
    </div>
    <div class="stat-item">
      <div class="stat-icon">
        <i class="fas fa-handshake"></i>
      </div>
      <div class="stat-content">
        <span class="stat-number">${stats.totalTransactions || 0}</span>
        <span class="stat-label">Transactions</span>
      </div>
    </div>
    <div class="stat-item">
      <div class="stat-icon">
        <i class="fas fa-dollar-sign"></i>
      </div>
      <div class="stat-content">
        <span class="stat-number">$${stats.totalEarnings || 0}</span>
        <span class="stat-label">Total Earnings</span>
      </div>
    </div>
    <div class="stat-item">
      <div class="stat-icon">
        <i class="fas fa-leaf"></i>
      </div>
      <div class="stat-content">
        <span class="stat-number">${stats.wasteRecycled || 0} kg</span>
        <span class="stat-label">Waste Recycled</span>
      </div>
    </div>
  `

  quickStats.innerHTML = statsHTML
}

// Populate activity timeline
function populateActivity(activities) {
  const activityContainer = document.getElementById("activityContainer")
  if (!activityContainer) return

  if (!activities || activities.length === 0) {
    activityContainer.innerHTML = '<div class="no-activity">No recent activity to display.</div>'
    return
  }

  const activityHTML = `
    <div class="activity-timeline">
      ${activities
        .map(
          (activity, index) => `
          <div class="activity-item ${index === 0 ? "latest" : ""}">
            <div class="activity-icon status-${activity.status || "info"}">
              <i class="fas fa-${getActivityIcon(activity.type)}"></i>
            </div>
            <div class="activity-content">
              <div class="activity-message">${activity.message}</div>
              <div class="activity-meta">
                <span class="activity-status status-${activity.status || "info"}">${capitalize(activity.status || "Info")}</span>
                <span class="activity-date">${formatDate(activity.createdAt)}</span>
              </div>
            </div>
          </div>
        `,
        )
        .join("")}
    </div>
  `

  activityContainer.innerHTML = activityHTML
}

// Populate impact metrics
function populateImpact(impact) {
  const impactMetrics = document.getElementById("impactMetrics")
  if (!impactMetrics) return

  const impactHTML = `
    <div class="impact-grid">
      <div class="impact-card environmental">
        <div class="impact-header">
          <i class="fas fa-leaf"></i>
          <h3>Environmental Impact</h3>
        </div>
        <div class="impact-stats">
          <div class="impact-stat">
            <span class="impact-number">${impact.co2Saved || 0}</span>
            <span class="impact-label">CO2 Saved (kg)</span>
          </div>
          <div class="impact-stat">
            <span class="impact-number">${impact.wasteRecycled || 0}</span>
            <span class="impact-label">Waste Recycled (kg)</span>
          </div>
        </div>
      </div>
      <div class="impact-card economic">
        <div class="impact-header">
          <i class="fas fa-dollar-sign"></i>
          <h3>Economic Impact</h3>
        </div>
        <div class="impact-stats">
          <div class="impact-stat">
            <span class="impact-number">$${impact.totalEarnings || 0}</span>
            <span class="impact-label">Total Earnings</span>
          </div>
          <div class="impact-stat">
            <span class="impact-number">${impact.jobsCreated || 0}</span>
            <span class="impact-label">Jobs Supported</span>
          </div>
        </div>
      </div>
      <div class="impact-card social">
        <div class="impact-header">
          <i class="fas fa-users"></i>
          <h3>Social Impact</h3>
        </div>
        <div class="impact-stats">
          <div class="impact-stat">
            <span class="impact-number">${impact.farmersHelped || 0}</span>
            <span class="impact-label">Farmers Helped</span>
          </div>
          <div class="impact-stat">
            <span class="impact-number">${impact.communitiesReached || 0}</span>
            <span class="impact-label">Communities</span>
          </div>
        </div>
      </div>
    </div>
  `

  impactMetrics.innerHTML = impactHTML
}

// Populate featured listings
function populateFeaturedListings(listings) {
  const featuredGrid = document.getElementById("featuredGrid")
  if (!featuredGrid) return

  if (!listings || listings.length === 0) {
    featuredGrid.innerHTML = '<div class="no-listings">No featured listings available at the moment.</div>'
    return
  }

  const listingsHTML = listings
    .map(
      (listing) => `
        <div class="featured-card">
          <img src="${listing.photo || "/placeholder.svg?height=200&width=300"}" 
               alt="${listing.title}" class="featured-image">
          <div class="featured-content">
            <h4>${listing.title}</h4>
            <span class="featured-type">${listing.type.replace("_", " ")}</span>
            <div class="featured-details">
              <p><i class="fas fa-weight"></i> ${listing.quantity}</p>
              <p><i class="fas fa-map-marker-alt"></i> ${listing.location}</p>
              <p><i class="fas fa-calendar"></i> Expires: ${formatDate(listing.expiry)}</p>
            </div>
            <div class="featured-price">$${listing.price} ${listing.priceUnit.replace("_", " ")}</div>
            <div class="featured-actions">
              <button onclick="sendRequest('${listing._id}')" class="btn btn-primary btn-small">
                <i class="fas fa-paper-plane"></i> Request
              </button>
              <button onclick="viewListing('${listing._id}')" class="btn btn-secondary btn-small">
                <i class="fas fa-eye"></i> View
              </button>
            </div>
          </div>
        </div>
      `,
    )
    .join("")

  featuredGrid.innerHTML = listingsHTML
}

// Populate waste reuse suggestions
function populateWasteReuseSuggestions() {
  const suggestionsContainer = document.getElementById("suggestionsContainer")
  if (!suggestionsContainer) return

  const suggestions = [
    {
      type: "Rice Husk",
      icon: "seedling",
      color: "green",
      uses: ["Biofuel production", "Building materials", "Soil amendment", "Animal bedding"],
    },
    {
      type: "Animal Manure",
      icon: "leaf",
      color: "brown",
      uses: ["Organic fertilizer", "Biogas production", "Compost material", "Soil conditioner"],
    },
    {
      type: "Fruit Peels",
      icon: "apple-alt",
      color: "orange",
      uses: ["Natural dyes", "Pectin extraction", "Animal feed", "Compost ingredient"],
    },
    {
      type: "Crop Residue",
      icon: "wheat",
      color: "yellow",
      uses: ["Biomass fuel", "Paper production", "Mushroom cultivation", "Mulching material"],
    },
  ]

  const suggestionsHTML = `
    <div class="suggestions-grid">
      ${suggestions
        .map(
          (suggestion) => `
          <div class="suggestion-card ${suggestion.color}">
            <div class="suggestion-header">
              <i class="fas fa-${suggestion.icon}"></i>
              <h4>${suggestion.type}</h4>
            </div>
            <ul class="suggestion-uses">
              ${suggestion.uses
                .map(
                  (use) => `
                  <li><i class="fas fa-check-circle"></i> ${use}</li>
              `,
                )
                .join("")}
            </ul>
            <button onclick="searchByType('${suggestion.type.toLowerCase().replace(" ", "_")}')" class="btn btn-primary btn-small">
              Find ${suggestion.type}
            </button>
          </div>
        `,
        )
        .join("")}
    </div>
  `

  suggestionsContainer.innerHTML = suggestionsHTML
}

// Populate transactions
function populateTransactions(transactions) {
  const transactionsContainer = document.getElementById("transactionsContainer")
  if (!transactionsContainer) return

  if (!transactions || transactions.length === 0) {
    transactionsContainer.innerHTML = '<div class="no-transactions">No recent transactions to display.</div>'
    return
  }

  const transactionsHTML = `
    <div class="transactions-list">
      ${transactions
        .map(
          (transaction) => `
          <div class="transaction-card">
            <div class="transaction-header">
              <h4>${transaction.wasteTitle}</h4>
              <span class="status-badge status-${transaction.status}">${capitalize(transaction.status)}</span>
            </div>
            <div class="transaction-details">
              <p><strong>Quantity:</strong> ${transaction.quantity}</p>
              <p><strong>Price:</strong> $${transaction.price}</p>
              <p><strong>Date:</strong> ${formatDate(transaction.createdAt)}</p>
              <p><strong>Partner:</strong> ${transaction.partnerName}</p>
            </div>
            <div class="transaction-actions">
              <button onclick="viewTransaction('${transaction._id}')" class="btn btn-secondary btn-small">
                View Details
              </button>
              ${
                transaction.status === "completed"
                  ? `
                  <button onclick="leaveReview('${transaction._id}', '${transaction.partnerId}')" class="btn btn-primary btn-small">
                    Leave Review
                  </button>
              `
                  : ""
              }
            </div>
          </div>
        `,
        )
        .join("")}
    </div>
  `

  transactionsContainer.innerHTML = transactionsHTML
}

// Populate reviews
function populateReviews(reviews) {
  const reviewsContainer = document.getElementById("reviewsContainer")
  if (!reviewsContainer) return

  if (!reviews || reviews.length === 0) {
    reviewsContainer.innerHTML = '<div class="no-reviews">No reviews to display yet.</div>'
    return
  }

  const reviewsHTML = `
    <div class="reviews-list">
      ${reviews
        .map(
          (review) => `
          <div class="review-card">
            <div class="review-header">
              <div class="reviewer-info">
                <strong>${review.reviewerName}</strong>
                <div class="review-rating">
                  ${generateStarRating(review.rating)}
                </div>
              </div>
              <div class="review-date">${formatDate(review.createdAt)}</div>
            </div>
            <div class="review-comment">"${review.comment}"</div>
          </div>
        `,
        )
        .join("")}
    </div>
  `

  reviewsContainer.innerHTML = reviewsHTML
}

// Utility functions
function getActivityIcon(type) {
  const icons = {
    listing_created: "plus",
    request_received: "paper-plane",
    request_accepted: "check",
    transaction_completed: "handshake",
    review_received: "star",
    request: "paper-plane",
  }
  return icons[type] || "info-circle"
}

function generateStarRating(rating) {
  let stars = ""
  for (let i = 1; i <= 5; i++) {
    stars += `<i class="fas fa-star ${i <= rating ? "active" : ""}"></i>`
  }
  return stars
}

// Action functions
function sendRequest(listingId) {
  document.getElementById("requestListingId").value = listingId
  openModal("requestModal")
}

function viewListing(listingId) {
  window.location.href = `/listings?id=${listingId}`
}

function searchByType(type) {
  window.location.href = `/listings?type=${type}`
}

function refreshListings() {
  loadDashboardData()
}

function viewTransaction(transactionId) {
  window.location.href = `/dashboard?tab=transactions&id=${transactionId}`
}

function leaveReview(requestId, revieweeId) {
  document.getElementById("reviewRequestId").value = requestId
  document.getElementById("revieweeId").value = revieweeId
  openModal("reviewModal")
}

// Modal functions
function openModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.remove("hidden")
    document.body.style.overflow = "hidden"
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.add("hidden")
    document.body.style.overflow = "auto"
  }
}

// Close modal when clicking outside
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    const modalId = e.target.id
    closeModal(modalId)
  }
})

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const openModals = document.querySelectorAll(".modal:not(.hidden)")
    openModals.forEach((modal) => {
      closeModal(modal.id)
    })
  }
})
