const fs = require("fs")
const path = require("path")

console.log("🧪 Testing Main Page Setup...\n")

// Check if required files exist
const requiredFiles = [
  "public/main.html",
  "public/main.js",
  "public/main-styles.css",
  "public/styles.css",
  "public/modal-styles.css",
]

let allFilesExist = true

requiredFiles.forEach((file) => {
  const filePath = path.join(__dirname, "..", file)
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} exists`)
  } else {
    console.log(`❌ ${file} is missing`)
    allFilesExist = false
  }
})

// Check main.html content
const mainHtmlPath = path.join(__dirname, "..", "public/main.html")
if (fs.existsSync(mainHtmlPath)) {
  const content = fs.readFileSync(mainHtmlPath, "utf8")

  const requiredSections = [
    "hero-auth",
    "profile-summary",
    "quick-actions",
    "impact-dashboard",
    "recent-activity",
    "featured-listings",
    "reuse-suggestions",
    "transactions-section",
    "reviews-section",
  ]

  console.log("\n📄 Checking main.html sections:")
  requiredSections.forEach((section) => {
    if (content.includes(section)) {
      console.log(`✅ ${section} section found`)
    } else {
      console.log(`❌ ${section} section missing`)
      allFilesExist = false
    }
  })

  // Check if main-styles.css is linked
  if (content.includes("main-styles.css")) {
    console.log("✅ main-styles.css is linked")
  } else {
    console.log("❌ main-styles.css is not linked")
    allFilesExist = false
  }
}

// Check main.js content
const mainJsPath = path.join(__dirname, "..", "public/main.js")
if (fs.existsSync(mainJsPath)) {
  const content = fs.readFileSync(mainJsPath, "utf8")

  const requiredFunctions = [
    "checkAuth",
    "loadUserData",
    "loadDashboardData",
    "populateProfile",
    "populateQuickStats",
    "populateActivity",
    "populateImpact",
    "populateFeaturedListings",
  ]

  console.log("\n🔧 Checking main.js functions:")
  requiredFunctions.forEach((func) => {
    if (content.includes(`function ${func}`) || content.includes(`${func} =`)) {
      console.log(`✅ ${func} function found`)
    } else {
      console.log(`❌ ${func} function missing`)
      allFilesExist = false
    }
  })
}

// Check main-styles.css content
const mainStylesPath = path.join(__dirname, "..", "public/main-styles.css")
if (fs.existsSync(mainStylesPath)) {
  const content = fs.readFileSync(mainStylesPath, "utf8")

  const requiredStyles = [
    ".hero-auth",
    ".profile-card",
    ".action-card",
    ".impact-card",
    ".activity-timeline",
    ".featured-card",
    ".suggestion-card",
  ]

  console.log("\n🎨 Checking main-styles.css classes:")
  requiredStyles.forEach((style) => {
    if (content.includes(style)) {
      console.log(`✅ ${style} style found`)
    } else {
      console.log(`❌ ${style} style missing`)
      allFilesExist = false
    }
  })
}

console.log("\n" + "=".repeat(50))
if (allFilesExist) {
  console.log("🎉 All main page files are properly set up!")
  console.log("\n📋 Next steps:")
  console.log("1. Run: node scripts/seed.js")
  console.log("2. Run: npm start")
  console.log("3. Login with: john.farmer@example.com / password123")
  console.log("4. Visit: http://localhost:3000/main")
} else {
  console.log("❌ Some files are missing or incomplete.")
  console.log("Please check the missing files above.")
}
console.log("=".repeat(50))
