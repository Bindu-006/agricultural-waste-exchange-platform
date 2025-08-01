// Sample data for agricultural waste listings with comprehensive information
const sampleListings = [
    {
      id: 1,
      title: "Premium Rice Husk - 500kg Available",
      type: "rice_husk",
      quantity: "500 kg",
      price: 25,
      priceUnit: "per_kg",
      location: "Punjab, India",
      description:
        "High-quality rice husk from organic farming. Perfect for biofuel production, building materials, and soil amendment. Freshly processed and ready for immediate pickup. Our rice husk is sourced from premium basmati rice processing and has excellent burning properties with low ash content.",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
      farmer: {
        name: "Rajesh Kumar",
        rating: 4.8,
        totalTransactions: 45,
        phone: "+91-98765-43210",
        email: "rajesh.kumar@example.com",
      },
      expiry: "2025-03-15",
      featured: true,
      createdAt: "2025-01-20",
      specifications: {
        moisture: "8-10%",
        ashContent: "15-17%",
        calorificValue: "3200-3600 kcal/kg",
      },
    },
    {
      id: 2,
      title: "Organic Cow Manure - Fresh Supply",
      type: "animal_manure",
      quantity: "2 tons",
      price: 15,
      priceUnit: "per_kg",
      location: "Haryana, India",
      description:
        "Fresh organic cow manure from grass-fed cattle. Excellent for organic farming and soil enrichment. Rich in nutrients and properly composted for 3 months. Our cattle are fed with natural fodder and the manure is free from chemical additives.",
      image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop",
      farmer: {
        name: "Priya Sharma",
        rating: 4.9,
        totalTransactions: 32,
        phone: "+91-98765-43211",
        email: "priya.sharma@example.com",
      },
      expiry: "2025-02-28",
      featured: true,
      createdAt: "2025-01-18",
      specifications: {
        nitrogen: "0.5-0.6%",
        phosphorus: "0.2-0.3%",
        potassium: "0.5-0.6%",
      },
    },
    {
      id: 3,
      title: "Mixed Fruit Peels - Citrus & Apple",
      type: "fruit_peels",
      quantity: "300 kg",
      price: 8,
      priceUnit: "per_kg",
      location: "Maharashtra, India",
      description:
        "Fresh mixed fruit peels from juice processing unit. Ideal for composting, natural dyes, and pectin extraction. Available in bulk quantities. The peels are from organic fruits and are processed within 24 hours of extraction.",
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=300&fit=crop",
      farmer: {
        name: "Amit Patel",
        rating: 4.6,
        totalTransactions: 28,
        phone: "+91-98765-43212",
        email: "amit.patel@example.com",
      },
      expiry: "2025-02-10",
      featured: true,
      createdAt: "2025-01-15",
      specifications: {
        moisture: "75-80%",
        pectinContent: "15-20%",
        sugarContent: "8-12%",
      },
    },
    {
      id: 4,
      title: "Wheat Straw Bales - Construction Grade",
      type: "crop_residue",
      quantity: "1.5 tons",
      price: 12,
      priceUnit: "per_kg",
      location: "Uttar Pradesh, India",
      description:
        "High-quality wheat straw bales perfect for construction, animal bedding, and biomass fuel. Properly dried and baled for easy transport. Each bale weighs approximately 20kg and is tightly compressed for efficient storage and transportation.",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
      farmer: {
        name: "Suresh Singh",
        rating: 4.7,
        totalTransactions: 38,
        phone: "+91-98765-43213",
        email: "suresh.singh@example.com",
      },
      expiry: "2025-03-20",
      featured: true,
      createdAt: "2025-01-12",
      specifications: {
        moisture: "12-15%",
        density: "120-150 kg/m³",
        fiberLength: "5-15 cm",
      },
    },
    {
      id: 5,
      title: "Coconut Coir Fiber - Premium Quality",
      type: "coconut_coir",
      quantity: "800 kg",
      price: 35,
      priceUnit: "per_kg",
      location: "Kerala, India",
      description:
        "Premium coconut coir fiber extracted from mature coconuts. Perfect for horticulture, rope making, and eco-friendly products manufacturing. The fiber is extracted using traditional methods and is completely natural without any chemical processing.",
      image: "https://images.unsplash.com/photo-1447279506476-3faec8071eee?w=400&h=300&fit=crop",
      farmer: {
        name: "Lakshmi Nair",
        rating: 4.9,
        totalTransactions: 52,
        phone: "+91-98765-43214",
        email: "lakshmi.nair@example.com",
      },
      expiry: "2025-04-10",
      featured: true,
      createdAt: "2025-01-10",
      specifications: {
        fiberLength: "15-25 cm",
        moisture: "10-15%",
        tensileStrength: "175 MPa",
      },
    },
    {
      id: 6,
      title: "Sugarcane Bagasse - Industrial Grade",
      type: "sugarcane_bagasse",
      quantity: "3 tons",
      price: 18,
      priceUnit: "per_kg",
      location: "Tamil Nadu, India",
      description:
        "Fresh sugarcane bagasse from sugar mill. Excellent for paper production, biofuel, and building materials. High fiber content and low moisture. The bagasse is from organic sugarcane and is processed immediately after juice extraction.",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
      farmer: {
        name: "Murugan Rajan",
        rating: 4.5,
        totalTransactions: 41,
        phone: "+91-98765-43215",
        email: "murugan.rajan@example.com",
      },
      expiry: "2025-02-25",
      featured: true,
      createdAt: "2025-01-08",
      specifications: {
        fiberContent: "45-50%",
        moisture: "48-52%",
        calorificValue: "1900 kcal/kg",
      },
    },
    {
      id: 7,
      title: "Vegetable Waste Mix - Restaurant Grade",
      type: "vegetable_waste",
      quantity: "400 kg",
      price: 5,
      priceUnit: "per_kg",
      location: "Delhi, India",
      description:
        "Fresh vegetable waste from restaurants and markets. Perfect for composting and biogas production. Daily collection available. The waste includes potato peels, onion skins, carrot tops, and other fresh vegetable trimmings.",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
      farmer: {
        name: "Ravi Gupta",
        rating: 4.4,
        totalTransactions: 25,
        phone: "+91-98765-43216",
        email: "ravi.gupta@example.com",
      },
      expiry: "2025-02-05",
      featured: false,
      createdAt: "2025-01-05",
      specifications: {
        moisture: "80-85%",
        organicMatter: "90-95%",
        carbonNitrogenRatio: "25:1",
      },
    },
    {
      id: 8,
      title: "Corn Husks - Dried & Processed",
      type: "crop_residue",
      quantity: "600 kg",
      price: 10,
      priceUnit: "per_kg",
      location: "Karnataka, India",
      description:
        "Dried corn husks from maize processing. Ideal for packaging materials, crafts, and biomass fuel. Properly cleaned and sorted. The husks are sun-dried and free from pesticide residues, making them perfect for food packaging applications.",
      image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop",
      farmer: {
        name: "Geetha Reddy",
        rating: 4.6,
        totalTransactions: 33,
        phone: "+91-98765-43217",
        email: "geetha.reddy@example.com",
      },
      expiry: "2025-03-30",
      featured: false,
      createdAt: "2025-01-03",
      specifications: {
        moisture: "8-12%",
        fiberContent: "35-40%",
        tensileStrength: "45 MPa",
      },
    },
    {
      id: 9,
      title: "Banana Peels & Leaves - Organic",
      type: "fruit_peels",
      quantity: "250 kg",
      price: 6,
      priceUnit: "per_kg",
      location: "Andhra Pradesh, India",
      description:
        "Fresh banana peels and leaves from organic plantation. Great for composting, natural packaging, and traditional cooking applications. The bananas are grown without chemical fertilizers and the peels are rich in potassium and other nutrients.",
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop",
      farmer: {
        name: "Venkat Rao",
        rating: 4.7,
        totalTransactions: 29,
        phone: "+91-98765-43218",
        email: "venkat.rao@example.com",
      },
      expiry: "2025-02-15",
      featured: false,
      createdAt: "2025-01-01",
      specifications: {
        potassium: "3.5-4.0%",
        moisture: "85-90%",
        organicCarbon: "35-40%",
      },
    },
    {
      id: 10,
      title: "Poultry Manure - Composted",
      type: "animal_manure",
      quantity: "1 ton",
      price: 20,
      priceUnit: "per_kg",
      location: "West Bengal, India",
      description:
        "Well-composted poultry manure from free-range chickens. High in nitrogen and perfect for vegetable gardens and crop production. The manure has been composted for 6 months and is pathogen-free with balanced nutrient content.",
      image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop",
      farmer: {
        name: "Subhash Das",
        rating: 4.8,
        totalTransactions: 36,
        phone: "+91-98765-43219",
        email: "subhash.das@example.com",
      },
      expiry: "2025-03-05",
      featured: false,
      createdAt: "2024-12-28",
      specifications: {
        nitrogen: "3.0-4.0%",
        phosphorus: "2.5-3.5%",
        potassium: "1.5-2.5%",
      },
    },
    {
      id: 11,
      title: "Cotton Stalks - Biomass Fuel",
      type: "crop_residue",
      quantity: "2.5 tons",
      price: 14,
      priceUnit: "per_kg",
      location: "Gujarat, India",
      description:
        "Dried cotton stalks perfect for biomass fuel and paper production. Sustainably harvested and properly processed for industrial use. The stalks are from organic cotton farming and have excellent burning properties with minimal smoke emission.",
      image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400&h=300&fit=crop",
      farmer: {
        name: "Kiran Modi",
        rating: 4.5,
        totalTransactions: 42,
        phone: "+91-98765-43220",
        email: "kiran.modi@example.com",
      },
      expiry: "2025-04-15",
      featured: false,
      createdAt: "2024-12-25",
      specifications: {
        moisture: "10-15%",
        calorificValue: "3800-4200 kcal/kg",
        ashContent: "8-12%",
      },
    },
    {
      id: 12,
      title: "Mixed Vegetable Scraps - Free Collection",
      type: "vegetable_waste",
      quantity: "200 kg",
      price: 0,
      priceUnit: "free",
      location: "Rajasthan, India",
      description:
        "Free vegetable scraps from local market. Perfect for small-scale composting projects. Collection required within 2 days. The scraps include fresh vegetable trimmings, slightly overripe produce, and outer leaves that are perfect for composting.",
      image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&h=300&fit=crop",
      farmer: {
        name: "Mohan Joshi",
        rating: 4.3,
        totalTransactions: 18,
        phone: "+91-98765-43221",
        email: "mohan.joshi@example.com",
      },
      expiry: "2025-02-02",
      featured: false,
      createdAt: "2024-12-22",
      specifications: {
        moisture: "85-90%",
        organicMatter: "85-90%",
        carbonNitrogenRatio: "30:1",
      },
    },
  ]
  
  // Comprehensive waste reuse suggestions with detailed information
  const wasteUseSuggestions = {
    rice_husk: {
      type: "Rice Husk",
      icon: "🌾",
      suggestions: [
        "Biofuel production and energy generation - High calorific value makes it excellent for power plants",
        "Building materials and insulation - Can be used in concrete blocks and as insulation material",
        "Soil amendment and gardening - Improves soil drainage and adds organic matter",
        "Animal bedding for livestock - Absorbent and comfortable for animals",
        "Water filtration systems - Natural filtration properties for water treatment",
        "Mushroom cultivation substrate - Provides nutrients for mushroom growing",
        "Paper and cardboard production - Alternative to wood pulp",
        "Activated carbon production - Can be processed into high-quality activated carbon",
      ],
      environmentalBenefits:
        "Reduces agricultural waste burning, prevents air pollution, and provides renewable energy source.",
    },
    animal_manure: {
      type: "Animal Manure",
      icon: "🐄",
      suggestions: [
        "Organic fertilizer for crops - Rich in nitrogen, phosphorus, and potassium",
        "Biogas production for energy - Methane generation through anaerobic digestion",
        "Compost material for gardens - Improves soil structure and fertility",
        "Soil conditioner and amendment - Enhances water retention and soil biology",
        "Mushroom growing medium - Provides nutrients for mushroom cultivation",
        "Natural pest deterrent - Some types can repel certain garden pests",
        "Vermicomposting with earthworms - Produces high-quality worm castings",
        "Liquid fertilizer production - Can be processed into concentrated liquid fertilizer",
      ],
      environmentalBenefits:
        "Reduces chemical fertilizer use, improves soil health, and provides renewable energy through biogas.",
    },
    fruit_peels: {
      type: "Fruit Peels",
      icon: "🍊",
      suggestions: [
        "Natural dyes and coloring agents - Extract natural colors for textiles and food",
        "Pectin extraction for food industry - Natural gelling agent for jams and jellies",
        "Compost and organic fertilizer - Rich in nutrients and organic matter",
        "Animal feed supplement - Nutritious addition to livestock feed",
        "Natural cleaning products - Citrus peels have natural cleaning properties",
        "Essential oil extraction - Valuable oils for cosmetics and aromatherapy",
        "Natural air fresheners - Dried peels provide natural fragrance",
        "Bioethanol production - Can be fermented to produce biofuel",
      ],
      environmentalBenefits:
        "Reduces food waste, provides natural alternatives to synthetic products, and supports circular economy.",
    },
    vegetable_waste: {
      type: "Vegetable Waste",
      icon: "🥬",
      suggestions: [
        "Composting for organic fertilizer - Creates nutrient-rich soil amendment",
        "Biogas production - Generates methane for cooking and heating",
        "Animal feed preparation - Nutritious feed for livestock and poultry",
        "Vermicomposting with earthworms - Produces premium worm castings",
        "Natural plant nutrients - Direct application as mulch and fertilizer",
        "Soil improvement material - Adds organic matter and improves soil structure",
        "Liquid fertilizer production - Fermented vegetable waste creates liquid nutrients",
        "Mushroom substrate - Growing medium for oyster and other mushrooms",
      ],
      environmentalBenefits:
        "Diverts waste from landfills, reduces methane emissions, and creates valuable soil amendments.",
    },
    crop_residue: {
      type: "Crop Residue",
      icon: "🌾",
      suggestions: [
        "Biomass fuel for energy - Clean burning fuel for heating and power generation",
        "Paper and pulp production - Alternative to wood for paper manufacturing",
        "Building materials and boards - Compressed boards and construction materials",
        "Animal bedding and feed - Comfortable bedding and nutritious feed supplement",
        "Mulching material for crops - Conserves soil moisture and suppresses weeds",
        "Biochar production - Carbon sequestration and soil improvement",
        "Packaging materials - Biodegradable packaging alternatives",
        "Textile fiber production - Some residues can be processed into natural fibers",
      ],
      environmentalBenefits:
        "Prevents field burning, reduces air pollution, and provides renewable energy and materials.",
    },
    coconut_coir: {
      type: "Coconut Coir",
      icon: "🥥",
      suggestions: [
        "Horticulture and plant growing medium - Excellent water retention and drainage",
        "Rope and twine manufacturing - Strong natural fiber for various applications",
        "Natural fiber products - Mats, brushes, and other household items",
        "Erosion control materials - Prevents soil erosion on slopes and embankments",
        "Water retention in gardens - Improves soil water holding capacity",
        "Eco-friendly packaging - Biodegradable alternative to synthetic materials",
        "Filtration media - Natural filter for water and air purification",
        "Insulation material - Natural insulation for buildings and greenhouses",
      ],
      environmentalBenefits:
        "Utilizes coconut waste, provides sustainable alternatives to peat moss, and supports eco-friendly products.",
    },
    sugarcane_bagasse: {
      type: "Sugarcane Bagasse",
      icon: "🎋",
      suggestions: [
        "Paper and pulp production - High-quality paper manufacturing",
        "Biofuel and energy generation - Efficient biomass fuel for power plants",
        "Building materials and boards - Particle boards and construction materials",
        "Packaging materials - Biodegradable food packaging and containers",
        "Mushroom cultivation - Excellent substrate for mushroom growing",
        "Bioethanol production - Fermentation for biofuel production",
        "Activated carbon production - High-quality carbon for filtration",
        "Textile fiber production - Can be processed into natural fibers",
      ],
      environmentalBenefits:
        "Reduces sugar industry waste, provides renewable energy, and offers sustainable material alternatives.",
    },
  }
  
  // Global variables for application state
  const currentListings = [...sampleListings]
  let filteredListings = [...sampleListings]
  let currentPage = 1
  const itemsPerPage = 6
  const isLoading = false
  
  // Initialize the page when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    console.log("Browse listings page loaded successfully")
    initializePage()
  })
  
  // Initialize page functionality
  function initializePage() {
    showLoadingPlaceholder()
  
    // Simulate loading delay for better UX
    setTimeout(() => {
      hideLoadingPlaceholder()
      displayListings()
      updateResultsCount()
      setupEventListeners()
    }, 1000)
  }
  
  // Setup event listeners
  function setupEventListeners() {
    // Search input enter key
    const searchInput = document.getElementById("searchInput")
    if (searchInput) {
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          searchListings()
        }
      })
    }
  
    // Form submission
    const requestForm = document.getElementById("requestForm")
    if (requestForm) {
      requestForm.addEventListener("submit", handleRequestSubmission)
    }
  
    // Modal close events
    document.addEventListener("click", handleModalClose)
    document.addEventListener("keydown", handleEscapeKey)
  }
  
  // Show loading placeholder
  function showLoadingPlaceholder() {
    const listingsGrid = document.getElementById("listingsGrid")
    if (listingsGrid) {
      listingsGrid.innerHTML = `
        <div class="loading-placeholder">
          <div class="spinner"></div>
          <p>Loading agricultural waste listings...</p>
        </div>
      `
    }
  }
  
  // Hide loading placeholder
  function hideLoadingPlaceholder() {
    // Loading placeholder will be replaced by actual listings
  }
  
  // Display listings function with enhanced features
  function displayListings() {
    const listingsGrid = document.getElementById("listingsGrid")
    if (!listingsGrid) return
  
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const listingsToShow = filteredListings.slice(startIndex, endIndex)
  
    if (listingsToShow.length === 0) {
      listingsGrid.innerHTML = `
        <div class="no-results">
          <p>No listings found matching your criteria.</p>
          <p>Try adjusting your filters or search terms.</p>
          <button onclick="clearFilters()" class="btn btn-primary">Clear All Filters</button>
        </div>
      `
      return
    }
  
    let listingsHTML = ""
    listingsToShow.forEach((listing, index) => {
      const priceDisplay =
        listing.priceUnit === "free"
          ? '<span class="free">Free Collection</span>'
          : `$${listing.price} ${listing.priceUnit.replace("_", " ")}`
  
      const featuredBadge = listing.featured ? '<div class="featured-badge">⭐ Featured</div>' : ""
  
      listingsHTML += `
        <div class="listing-card" style="animation-delay: ${index * 0.1}s">
          ${featuredBadge}
          <img src="${listing.image}" 
               alt="${listing.title}" 
               class="listing-image" 
               onerror="this.src='https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop'"
               loading="lazy">
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
                <span>${listing.farmer.name}</span>
              </div>
              <div class="listing-detail">
                <i class="fas fa-star"></i>
                <span>${listing.farmer.rating.toFixed(1)} ⭐ (${listing.farmer.totalTransactions} deals)</span>
              </div>
              <div class="listing-detail">
                <i class="fas fa-calendar-alt"></i>
                <span>Available until ${new Date(listing.expiry).toLocaleDateString()}</span>
              </div>
            </div>
            <div class="listing-price ${listing.priceUnit === "free" ? "free" : ""}">${priceDisplay}</div>
            <div class="listing-actions">
              <button class="btn btn-small btn-secondary" onclick="viewListingDetails(${listing.id})">
                <i class="fas fa-eye"></i> View Details
              </button>
              <button class="btn btn-small btn-primary" onclick="openRequestModal(${listing.id})">
                <i class="fas fa-paper-plane"></i> Send Request
              </button>
              <button class="btn btn-small btn-info" onclick="viewSuggestions('${listing.type}')">
                <i class="fas fa-lightbulb"></i> Uses
              </button>
            </div>
          </div>
        </div>
      `
    })
  
    listingsGrid.innerHTML = listingsHTML
    updatePagination()
  }
  
  // Update results count with enhanced information
  function updateResultsCount() {
    const resultsCount = document.getElementById("resultsCount")
    if (resultsCount) {
      const total = filteredListings.length
      const showing = Math.min(itemsPerPage, total - (currentPage - 1) * itemsPerPage)
      const startIndex = (currentPage - 1) * itemsPerPage + 1
      const endIndex = startIndex + showing - 1
  
      if (total === 0) {
        resultsCount.textContent = "No listings found"
      } else if (total <= itemsPerPage) {
        resultsCount.textContent = `${total} listing${total !== 1 ? "s" : ""} found`
      } else {
        resultsCount.textContent = `Showing ${startIndex}-${endIndex} of ${total} listings`
      }
    }
  }
  
  // Enhanced pagination with better navigation
  function updatePagination() {
    const pagination = document.getElementById("pagination")
    if (!pagination) return
  
    const totalPages = Math.ceil(filteredListings.length / itemsPerPage)
  
    if (totalPages <= 1) {
      pagination.innerHTML = ""
      return
    }
  
    let paginationHTML = '<div class="pagination-controls">'
  
    // Previous button
    if (currentPage > 1) {
      paginationHTML += `
        <button class="btn btn-small btn-secondary" onclick="loadPage(${currentPage - 1})">
          <i class="fas fa-chevron-left"></i> Previous
        </button>
      `
    }
  
    // Page numbers with smart display
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
  
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }
  
    // First page and ellipsis
    if (startPage > 1) {
      paginationHTML += `<button class="btn btn-small btn-secondary" onclick="loadPage(1)">1</button>`
      if (startPage > 2) {
        paginationHTML += `<span class="pagination-ellipsis">...</span>`
      }
    }
  
    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      const activeClass = i === currentPage ? "btn-primary" : "btn-secondary"
      paginationHTML += `<button class="btn btn-small ${activeClass}" onclick="loadPage(${i})">${i}</button>`
    }
  
    // Last page and ellipsis
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationHTML += `<span class="pagination-ellipsis">...</span>`
      }
      paginationHTML += `<button class="btn btn-small btn-secondary" onclick="loadPage(${totalPages})">${totalPages}</button>`
    }
  
    // Next button
    if (currentPage < totalPages) {
      paginationHTML += `
        <button class="btn btn-small btn-secondary" onclick="loadPage(${currentPage + 1})">
          Next <i class="fas fa-chevron-right"></i>
        </button>
      `
    }
  
    paginationHTML += "</div>"
    pagination.innerHTML = paginationHTML
  }
  
  // Load specific page with smooth scrolling
  function loadPage(page) {
    if (page < 1 || page > Math.ceil(filteredListings.length / itemsPerPage)) return
  
    currentPage = page
    displayListings()
    updateResultsCount()
  
    // Smooth scroll to top of listings
    const listingsResults = document.querySelector(".listings-results")
    if (listingsResults) {
      listingsResults.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }
  
  // Enhanced search functionality
  function searchListings() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase().trim()
  
    if (searchTerm === "") {
      filteredListings = [...currentListings]
    } else {
      filteredListings = currentListings.filter(
        (listing) =>
          listing.title.toLowerCase().includes(searchTerm) ||
          listing.description.toLowerCase().includes(searchTerm) ||
          listing.type.toLowerCase().replace("_", " ").includes(searchTerm) ||
          listing.location.toLowerCase().includes(searchTerm) ||
          listing.farmer.name.toLowerCase().includes(searchTerm) ||
          (listing.specifications &&
            Object.values(listing.specifications).some((spec) => spec.toString().toLowerCase().includes(searchTerm))),
      )
    }
  
    currentPage = 1
    displayListings()
    updateResultsCount()
  }
  
  // Enhanced filtering with multiple criteria
  function filterListings() {
    const typeFilter = document.getElementById("typeFilter").value
    const locationFilter = document.getElementById("locationFilter").value.toLowerCase().trim()
    const minPrice = Number.parseFloat(document.getElementById("minPriceFilter").value) || 0
    const maxPrice = Number.parseFloat(document.getElementById("maxPriceFilter").value) || Number.POSITIVE_INFINITY
  
    filteredListings = currentListings.filter((listing) => {
      const matchesType = typeFilter === "all" || listing.type === typeFilter
      const matchesLocation = locationFilter === "" || listing.location.toLowerCase().includes(locationFilter)
      const matchesPrice =
        (listing.priceUnit === "free" && minPrice === 0) || (listing.price >= minPrice && listing.price <= maxPrice)
  
      return matchesType && matchesLocation && matchesPrice
    })
  
    currentPage = 1
    displayListings()
    updateResultsCount()
  }
  
  // Enhanced sorting with more options
  function sortListings() {
    const sortBy = document.getElementById("sortBy").value
  
    switch (sortBy) {
      case "newest":
        filteredListings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case "oldest":
        filteredListings.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        break
      case "price_low":
        filteredListings.sort((a, b) => {
          const priceA = a.priceUnit === "free" ? 0 : a.price
          const priceB = b.priceUnit === "free" ? 0 : b.price
          return priceA - priceB
        })
        break
      case "price_high":
        filteredListings.sort((a, b) => {
          const priceA = a.priceUnit === "free" ? 0 : a.price
          const priceB = b.priceUnit === "free" ? 0 : b.price
          return priceB - priceA
        })
        break
      case "rating":
        filteredListings.sort((a, b) => b.farmer.rating - a.farmer.rating)
        break
      case "quantity":
        filteredListings.sort((a, b) => {
          const quantityA = Number.parseFloat(a.quantity.replace(/[^\d.]/g, ""))
          const quantityB = Number.parseFloat(b.quantity.replace(/[^\d.]/g, ""))
          return quantityB - quantityA
        })
        break
    }
  
    displayListings()
  }
  
  // Clear all filters and reset to default state
  function clearFilters() {
    document.getElementById("searchInput").value = ""
    document.getElementById("typeFilter").value = "all"
    document.getElementById("locationFilter").value = ""
    document.getElementById("minPriceFilter").value = ""
    document.getElementById("maxPriceFilter").value = ""
    document.getElementById("sortBy").value = "newest"
  
    filteredListings = [...currentListings]
    currentPage = 1
    displayListings()
    updateResultsCount()
  }
  
  // Enhanced listing details view
  function viewListingDetails(listingId) {
    const listing = currentListings.find((l) => l.id === listingId)
    if (!listing) return
  
    const detailTitle = document.getElementById("detailTitle")
    const detailContent = document.getElementById("listingDetailContent")
  
    detailTitle.textContent = listing.title
  
    const priceDisplay =
      listing.priceUnit === "free" ? "Free Collection" : `$${listing.price} ${listing.priceUnit.replace("_", " ")}`
    const specifications = listing.specifications
      ? Object.entries(listing.specifications)
          .map(
            ([key, value]) =>
              `<p><strong>${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}:</strong> ${value}</p>`,
          )
          .join("")
      : "<p>No specifications available</p>"
  
    detailContent.innerHTML = `
      <div class="listing-detail-grid">
        <div class="listing-detail-image">
          <img src="${listing.image}" alt="${listing.title}" 
               onerror="this.src='https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop'">
        </div>
        <div class="listing-detail-info">
          <div class="detail-section">
            <h4>Basic Information</h4>
            <p><strong>Type:</strong> ${listing.type.replace("_", " ")}</p>
            <p><strong>Quantity:</strong> ${listing.quantity}</p>
            <p><strong>Price:</strong> ${priceDisplay}</p>
            <p><strong>Location:</strong> ${listing.location}</p>
            <p><strong>Available Until:</strong> ${new Date(listing.expiry).toLocaleDateString()}</p>
            <p><strong>Listed:</strong> ${new Date(listing.createdAt).toLocaleDateString()}</p>
          </div>
          
          <div class="detail-section">
            <h4>Farmer Information</h4>
            <p><strong>Name:</strong> ${listing.farmer.name}</p>
            <p><strong>Rating:</strong> ${listing.farmer.rating.toFixed(1)}/5.0 ⭐</p>
            <p><strong>Total Transactions:</strong> ${listing.farmer.totalTransactions}</p>
            <p><strong>Contact:</strong> ${listing.farmer.phone}</p>
          </div>
          
          <div class="detail-section">
            <h4>Technical Specifications</h4>
            ${specifications}
          </div>
          
          <div class="detail-section">
            <h4>Description</h4>
            <p>${listing.description}</p>
          </div>
          
          <div class="detail-actions">
            <button class="btn btn-primary" onclick="closeModal('listingDetailModal'); openRequestModal(${listing.id})">
              <i class="fas fa-paper-plane"></i> Send Request
            </button>
            <button class="btn btn-secondary" onclick="viewSuggestions('${listing.type}')">
              <i class="fas fa-lightbulb"></i> View Uses
            </button>
            <button class="btn btn-info" onclick="shareListing(${listing.id})">
              <i class="fas fa-share"></i> Share
            </button>
          </div>
        </div>
      </div>
    `
  
    openModal("listingDetailModal")
  }
  
  // Open request modal with pre-filled information
  function openRequestModal(listingId) {
    const listing = currentListings.find((l) => l.id === listingId)
    if (!listing) return
  
    document.getElementById("requestListingId").value = listingId
  
    // Pre-fill some information
    const messageField = document.getElementById("requestMessage")
    if (messageField) {
      messageField.placeholder = `I'm interested in your ${listing.title}. Please let me know about availability and pickup arrangements.`
    }
  
    openModal("requestModal")
  }
  
  // Enhanced waste reuse suggestions
  function viewSuggestions(wasteType) {
    const suggestions = wasteUseSuggestions[wasteType]
    if (!suggestions) return
  
    const suggestionsContent = document.getElementById("suggestionsContent")
  
    let suggestionsHTML = `
      <div class="suggestions-content">
        <h4>${suggestions.icon} Potential Uses for ${suggestions.type}</h4>
        <ul class="suggestions-list">
    `
  
    suggestions.suggestions.forEach((suggestion) => {
      suggestionsHTML += `<li><i class="fas fa-check-circle"></i> ${suggestion}</li>`
    })
  
    suggestionsHTML += `
        </ul>
        <div class="suggestions-note">
          <h5>Environmental Benefits:</h5>
          <p>${suggestions.environmentalBenefits}</p>
          <br>
          <p><strong>Note:</strong> These are general suggestions. Actual applications may vary based on quality, 
          local regulations, and processing requirements. Always consult with experts for specific applications.</p>
        </div>
      </div>
    `
  
    suggestionsContent.innerHTML = suggestionsHTML
    openModal("suggestionsModal")
  }
  
  // Share listing functionality
  function shareListing(listingId) {
    const listing = currentListings.find((l) => l.id === listingId)
    if (!listing) return
  
    const shareText = `Check out this agricultural waste listing: ${listing.title} - ${listing.quantity} available in ${listing.location}`
    const shareUrl = `${window.location.origin}${window.location.pathname}?listing=${listingId}`
  
    if (navigator.share) {
      navigator.share({
        title: listing.title,
        text: shareText,
        url: shareUrl,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`).then(() => {
        showSuccessMessage("Listing link copied to clipboard!")
      })
    }
  }
  
  // Modal management functions
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
  
  // Handle request form submission
  function handleRequestSubmission(e) {
    e.preventDefault()
  
    const listingId = document.getElementById("requestListingId").value
    const quantity = document.getElementById("desiredQuantity").value
    const message = document.getElementById("requestMessage").value
    const contact = document.getElementById("contactInfo").value
  
    // Show loading
    showLoading()
  
    // Simulate API call
    setTimeout(() => {
      hideLoading()
  
      const listing = currentListings.find((l) => l.id == listingId)
      const successText = `Request sent successfully to ${listing.farmer.name}!\n\nThey will contact you at: ${contact}`
  
      showSuccessMessage(successText)
  
      // Reset form and close modal
      e.target.reset()
      closeModal("requestModal")
    }, 2000)
  }
  
  // Handle modal close on outside click
  function handleModalClose(e) {
    if (e.target.classList.contains("modal")) {
      const modalId = e.target.id
      closeModal(modalId)
    }
  }
  
  // Handle escape key to close modals
  function handleEscapeKey(e) {
    if (e.key === "Escape") {
      const openModals = document.querySelectorAll(".modal:not(.hidden)")
      openModals.forEach((modal) => {
        closeModal(modal.id)
      })
    }
  }
  
  // Mobile menu toggle
  function toggleMobileMenu() {
    const navMenu = document.querySelector(".nav-menu")
    if (navMenu) {
      navMenu.classList.toggle("active")
    }
  }
  
  // Show loading overlay
  function showLoading() {
    const loading = document.getElementById("loading")
    if (loading) {
      loading.classList.remove("hidden")
    }
  }
  
  // Hide loading overlay
  function hideLoading() {
    const loading = document.getElementById("loading")
    if (loading) {
      loading.classList.add("hidden")
    }
  }
  
  // Show success message
  function showSuccessMessage(message) {
    const successMessage = document.getElementById("successMessage")
    const successText = document.getElementById("successText")
  
    if (successMessage && successText) {
      successText.textContent = message
      successMessage.classList.remove("hidden")
  
      // Auto hide after 5 seconds
      setTimeout(() => {
        successMessage.classList.add("hidden")
      }, 5000)
    }
  }
  
  // Initialize page with URL parameters (for direct listing links)
  function initializeFromURL() {
    const urlParams = new URLSearchParams(window.location.search)
    const listingId = urlParams.get("listing")
  
    if (listingId) {
      // Show specific listing details
      setTimeout(() => {
        viewListingDetails(Number.parseInt(listingId))
      }, 1500)
    }
  }
  
  // Call URL initialization
  initializeFromURL()
  
  console.log("Browse listings JavaScript loaded successfully with enhanced features")
  