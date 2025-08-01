// Utility functions
const isAuthenticated = () => localStorage.getItem("token") !== null

const getCurrentUser = () => {
  const userData = localStorage.getItem("user")
  return userData ? JSON.parse(userData) : null
}

const showLoading = () => {
  const loading = document.getElementById("loading")
  if (loading) {
    loading.classList.remove("hidden")
  }
}

const hideLoading = () => {
  const loading = document.getElementById("loading")
  if (loading) {
    loading.classList.add("hidden")
  }
}

const showAlert = (message, type = "info") => {
  // Remove existing alerts
  const existingAlerts = document.querySelectorAll(".alert")
  existingAlerts.forEach((alert) => alert.remove())

  const alertDiv = document.createElement("div")
  alertDiv.className = `alert alert-${type}`
  alertDiv.textContent = message

  const container = document.querySelector(".listings-container") || document.body
  container.insertBefore(alertDiv, container.firstChild)

  setTimeout(() => {
    alertDiv.remove()
  }, 5000)
}

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }
  return new Date(dateString).toLocaleDateString("en-US", options)
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
    console.error("API Request failed:", error)
    throw error
  }
}

const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  window.location.href = "/"
}

let currentListings = []
let currentPage = 1
let totalPages = 1

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing listings page...")

  // Check authentication status and update nav
  updateNavigation()

  // Load initial listings
  loadListings()

  // Add enter key listener for search
  const searchInput = document.getElementById("searchInput")
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        searchListings()
      }
    })
  }
})

function updateNavigation() {
  const isAuth = isAuthenticated()
  const user = getCurrentUser()

  console.log("Updating navigation, authenticated:", isAuth, "user:", user)

  // Get navigation elements
  const homeLink = document.getElementById("homeLink")
  const mainLink = document.getElementById("mainLink")
  const dashboardLink = document.getElementById("dashboardLink")
  const loginLink = document.getElementById("loginLink")
  const registerLink = document.getElementById("registerLink")
  const userGreeting = document.getElementById("userGreeting")
  const logoutLink = document.getElementById("logoutLink")

  if (isAuth && user && user.name) {
    // Show authenticated navigation
    if (homeLink) homeLink.style.display = "none"
    if (mainLink) mainLink.style.display = "block"
    if (dashboardLink) dashboardLink.style.display = "block"
    if (loginLink) loginLink.style.display = "none"
    if (registerLink) registerLink.style.display = "none"
    if (userGreeting) {
      userGreeting.style.display = "block"
      const greetingSpan = userGreeting.querySelector(".user-greeting")
      if (greetingSpan) {
        greetingSpan.textContent = `Welcome, ${user.name}!`
      }
    }
    if (logoutLink) logoutLink.style.display = "block"
  } else {
    // Show public navigation
    if (homeLink) homeLink.style.display = "block"
    if (mainLink) mainLink.style.display = "none"
    if (dashboardLink) dashboardLink.style.display = "none"
    if (loginLink) loginLink.style.display = "block"
    if (registerLink) registerLink.style.display = "block"
    if (userGreeting) userGreeting.style.display = "none"
    if (logoutLink) logoutLink.style.display = "none"
  }
}

async function loadListings(page = 1) {
  try {
    console.log("Loading listings for page:", page)
    showLoading()

    const searchParams = new URLSearchParams({
      page: page.toString(),
      limit: "12",
      search: document.getElementById("searchInput")?.value || "",
      type: document.getElementById("typeFilter")?.value || "all",
      location: document.getElementById("locationFilter")?.value || "",
      minPrice: document.getElementById("minPriceFilter")?.value || "",
      maxPrice: document.getElementById("maxPriceFilter")?.value || "",
    })

    console.log("Search params:", searchParams.toString())

    const response = await fetch(`/api/waste?${searchParams}`)
    const data = await response.json()

    console.log("API Response:", data)

    if (data.success && data.listings) {
      currentListings = data.listings
      currentPage = Number.parseInt(data.currentPage) || page
      totalPages = data.totalPages || 1

      console.log(`Loaded ${data.listings.length} listings`)

      displayListings(data.listings)
      updateResultsCount(data.total || 0)
      updatePagination()
    } else {
      throw new Error(data.message || "Failed to load listings")
    }
  } catch (error) {
    console.error("Error loading listings:", error)
    showAlert("Failed to load listings. Please try again.", "error")
    const listingsGrid = document.getElementById("listingsGrid")
    if (listingsGrid) {
      listingsGrid.innerHTML = "<p>Error loading listings. Please refresh the page.</p>"
    }
  } finally {
    hideLoading()
  }
}

function displayListings(listings) {
  const listingsGrid = document.getElementById("listingsGrid")
  if (!listingsGrid) {
    console.error("Listings grid element not found")
    return
  }

  console.log("Displaying", listings.length, "listings")

  if (listings.length === 0) {
    listingsGrid.innerHTML = '<div class="no-results"><p>No listings found matching your criteria.</p></div>'
    return
  }

  let listingsHTML = ""
  listings.forEach((listing) => {
    const imageUrl = listing.photo
      ? `/uploads/${listing.photo}`
      : "/placeholder.svg?height=200&width=350&text=Agricultural+Waste"
    const priceDisplay =
      listing.priceUnit === "free" ? "Free" : `$${listing.price} ${listing.priceUnit.replace("_", " ")}`

    const farmerName = listing.farmer?.name || "Unknown Farmer"
    const farmerRating = listing.farmer?.rating || 0

    listingsHTML += `
            <div class="listing-card">
                <img src="${imageUrl}" alt="${listing.title}" class="listing-image" onerror="this.src='/placeholder.svg?height=200&width=350&text=Agricultural+Waste'">
                <div class="listing-content">
                    <h3 class="listing-title">${listing.title}</h3>
                    <span class="listing-type">${listing.type.replace("_", " ")}</span>
                    <div class="listing-details">
                        <div class="listing-detail">
                            <i class="fas fa-weight-hanging"></i>
                            <span>${listing.quantity}</span>
                        </div>
                        <div class="listing-detail">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${listing.location}</span>
                        </div>
                        <div class="listing-detail">
                            <i class="fas fa-user"></i>
                            <span>${farmerName}</span>
                        </div>
                        <div class="listing-detail">
                            <i class="fas fa-star"></i>
                            <span>${farmerRating ? farmerRating.toFixed(1) : "New"}</span>
                        </div>
                    </div>
                    <div class="listing-price">${priceDisplay}</div>
                    <div class="listing-actions">
                        <button class="btn btn-small btn-secondary" onclick="viewListingDetails('${listing._id}')">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                        ${
                          isAuthenticated() && getCurrentUser()?.role === "buyer"
                            ? `
                            <button class="btn btn-small btn-primary" onclick="openRequestModal('${listing._id}')">
                                <i class="fas fa-paper-plane"></i> Request
                            </button>
                        `
                            : ""
                        }
                        <button class="btn btn-small btn-info" onclick="viewSuggestions('${listing.type}')">
                            <i class="fas fa-lightbulb"></i> Uses
                        </button>
                    </div>
                </div>
            </div>
        `
  })

  listingsGrid.innerHTML = listingsHTML
}

function updateResultsCount(total) {
  const resultsCount = document.getElementById("resultsCount")
  if (resultsCount) {
    resultsCount.textContent = `${total} listing${total !== 1 ? "s" : ""} found`
  }
}

function updatePagination() {
  const pagination = document.getElementById("pagination")
  if (!pagination) return

  if (totalPages <= 1) {
    pagination.innerHTML = ""
    return
  }

  let paginationHTML = '<div class="pagination-controls">'

  // Previous button
  if (currentPage > 1) {
    paginationHTML += `<button class="btn btn-small btn-secondary" onclick="loadListings(${currentPage - 1})">Previous</button>`
  }

  // Page numbers
  for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
    const activeClass = i === currentPage ? "btn-primary" : "btn-secondary"
    paginationHTML += `<button class="btn btn-small ${activeClass}" onclick="loadListings(${i})">${i}</button>`
  }

  // Next button
  if (currentPage < totalPages) {
    paginationHTML += `<button class="btn btn-small btn-secondary" onclick="loadListings(${currentPage + 1})">Next</button>`
  }

  paginationHTML += "</div>"
  pagination.innerHTML = paginationHTML
}

function searchListings() {
  console.log("Searching listings...")
  currentPage = 1
  loadListings(1)
}

function filterListings() {
  console.log("Filtering listings...")
  currentPage = 1
  loadListings(1)
}

function sortListings() {
  const sortBy = document.getElementById("sortBy")?.value
  if (!sortBy) return

  const sortedListings = [...currentListings]

  switch (sortBy) {
    case "newest":
      sortedListings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      break
    case "oldest":
      sortedListings.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      break
    case "price_low":
      sortedListings.sort((a, b) => a.price - b.price)
      break
    case "price_high":
      sortedListings.sort((a, b) => b.price - a.price)
      break
  }

  displayListings(sortedListings)
}

function clearFilters() {
  const searchInput = document.getElementById("searchInput")
  const typeFilter = document.getElementById("typeFilter")
  const locationFilter = document.getElementById("locationFilter")
  const minPriceFilter = document.getElementById("minPriceFilter")
  const maxPriceFilter = document.getElementById("maxPriceFilter")
  const sortBy = document.getElementById("sortBy")

  if (searchInput) searchInput.value = ""
  if (typeFilter) typeFilter.value = "all"
  if (locationFilter) locationFilter.value = ""
  if (minPriceFilter) minPriceFilter.value = ""
  if (maxPriceFilter) maxPriceFilter.value = ""
  if (sortBy) sortBy.value = "newest"

  loadListings(1)
}

async function viewListingDetails(listingId) {
  try {
    console.log("Viewing listing details for:", listingId)
    showLoading()

    const response = await fetch(`/api/waste/${listingId}`)
    const data = await response.json()

    if (data.success && data.listing) {
      displayListingDetails(data.listing)
      openModal("listingDetailModal")
    } else {
      throw new Error(data.message || "Failed to load listing details")
    }
  } catch (error) {
    console.error("Error loading listing details:", error)
    showAlert("Failed to load listing details", "error")
  } finally {
    hideLoading()
  }
}

function displayListingDetails(listing) {
  const detailTitle = document.getElementById("detailTitle")
  const detailContent = document.getElementById("listingDetailContent")

  if (detailTitle) {
    detailTitle.textContent = listing.title
  }

  if (!detailContent) return

  const imageUrl = listing.photo
    ? `/uploads/${listing.photo}`
    : "/placeholder.svg?height=300&width=400&text=Agricultural+Waste"
  const priceDisplay =
    listing.priceUnit === "free" ? "Free" : `$${listing.price} ${listing.priceUnit.replace("_", " ")}`

  detailContent.innerHTML = `
        <div class="listing-detail-grid">
            <div class="listing-detail-image">
                <img src="${imageUrl}" alt="${listing.title}" onerror="this.src='/placeholder.svg?height=300&width=400&text=Agricultural+Waste'">
            </div>
            <div class="listing-detail-info">
                <div class="detail-section">
                    <h4>Basic Information</h4>
                    <p><strong>Type:</strong> ${listing.type.replace("_", " ")}</p>
                    <p><strong>Quantity:</strong> ${listing.quantity}</p>
                    <p><strong>Price:</strong> ${priceDisplay}</p>
                    <p><strong>Location:</strong> ${listing.location}</p>
                    <p><strong>Expires:</strong> ${formatDate(listing.expiry)}</p>
                </div>
                
                <div class="detail-section">
                    <h4>Farmer Information</h4>
                    <p><strong>Name:</strong> ${listing.farmer?.name || "Unknown"}</p>
                    <p><strong>Location:</strong> ${listing.farmer?.location || "Not specified"}</p>
                    <p><strong>Rating:</strong> ${listing.farmer?.rating ? listing.farmer.rating.toFixed(1) + "/5" : "New farmer"}</p>
                    <p><strong>Total Transactions:</strong> ${listing.farmer?.totalTransactions || 0}</p>
                </div>
                
                <div class="detail-section">
                    <h4>Description</h4>
                    <p>${listing.description}</p>
                </div>
                
                ${
                  isAuthenticated() && getCurrentUser()?.role === "buyer"
                    ? `
                    <div class="detail-actions">
                        <button class="btn btn-primary" onclick="closeModal('listingDetailModal'); openRequestModal('${listing._id}')">
                            <i class="fas fa-paper-plane"></i> Send Request
                        </button>
                        <button class="btn btn-secondary" onclick="viewSuggestions('${listing.type}')">
                            <i class="fas fa-lightbulb"></i> View Uses
                        </button>
                    </div>
                `
                    : ""
                }
            </div>
        </div>
    `
}

function openRequestModal(listingId) {
  if (!isAuthenticated()) {
    showAlert("Please login to send requests", "warning")
    window.location.href = "/login"
    return
  }

  if (getCurrentUser()?.role !== "buyer") {
    showAlert("Only buyers can send requests", "warning")
    return
  }

  const requestListingId = document.getElementById("requestListingId")
  if (requestListingId) {
    requestListingId.value = listingId
  }
  openModal("requestModal")
}

// Request form handler
const requestForm = document.getElementById("requestForm")
if (requestForm) {
  requestForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const requestData = {
      wasteListingId: document.getElementById("requestListingId")?.value,
      desiredQuantity: formData.get("desiredQuantity"),
      message: formData.get("message"),
    }

    try {
      showLoading()

      const response = await apiRequest("/requests", {
        method: "POST",
        body: requestData,
      })

      if (response.success) {
        showAlert("Request sent successfully!", "success")
        closeModal("requestModal")
        e.target.reset()
      } else {
        throw new Error(response.message || "Failed to send request")
      }
    } catch (error) {
      console.error("Error sending request:", error)
      showAlert(error.message || "Failed to send request", "error")
    } finally {
      hideLoading()
    }
  })
}

async function viewSuggestions(wasteType) {
  try {
    console.log("Loading suggestions for:", wasteType)
    const response = await fetch(`/api/waste/${wasteType}/suggestions`)
    const data = await response.json()

    if (data.success && data.suggestions) {
      let suggestionsHTML = `
                <div class="suggestions-content">
                    <h4>Potential Uses for ${data.type.replace("_", " ")}</h4>
                    <ul class="suggestions-list">
            `

      data.suggestions.forEach((suggestion) => {
        suggestionsHTML += `<li><i class="fas fa-check-circle"></i> ${suggestion}</li>`
      })

      suggestionsHTML += `
                    </ul>
                    <p class="suggestions-note">These are general suggestions. Actual applications may vary based on quality and local regulations.</p>
                </div>
            `

      // Create and show suggestions modal
      const modal = document.createElement("div")
      modal.className = "modal"
      modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Waste Reuse Suggestions</h3>
                        <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                    </div>
                    ${suggestionsHTML}
                </div>
            `

      document.body.appendChild(modal)
    } else {
      throw new Error(data.message || "Failed to load suggestions")
    }
  } catch (error) {
    console.error("Error loading suggestions:", error)
    showAlert("Failed to load suggestions", "error")
  }
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
    if (modalId) {
      closeModal(modalId)
    }
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
