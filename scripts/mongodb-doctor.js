const { spawn } = require("child_process")
const os = require("os")

function checkMongoDB() {
  console.log("🏥 MongoDB Doctor - Diagnosing Issues...")
  console.log("=".repeat(50))

  const platform = os.platform()
  console.log(`💻 Operating System: ${platform}`)

  // Check if MongoDB is installed
  console.log("\n🔍 Checking if MongoDB is installed...")

  const mongoCheck = spawn("mongo", ["--version"], { shell: true })

  mongoCheck.stdout.on("data", (data) => {
    console.log("✅ MongoDB is installed:")
    console.log(data.toString())
  })

  mongoCheck.stderr.on("data", (data) => {
    console.log("❌ MongoDB not found or not in PATH")
    console.log("Error:", data.toString())

    console.log("\n💡 Installation instructions:")
    if (platform === "win32") {
      console.log("Windows:")
      console.log("1. Download from: https://www.mongodb.com/try/download/community")
      console.log("2. Run the installer")
      console.log("3. Start service: net start MongoDB")
    } else if (platform === "darwin") {
      console.log("macOS:")
      console.log(
        '1. Install Homebrew: /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
      )
      console.log("2. Install MongoDB: brew tap mongodb/brew && brew install mongodb-community")
      console.log("3. Start service: brew services start mongodb-community")
    } else {
      console.log("Linux (Ubuntu/Debian):")
      console.log("1. Update: sudo apt update")
      console.log("2. Install: sudo apt install -y mongodb")
      console.log("3. Start: sudo systemctl start mongod")
      console.log("4. Enable: sudo systemctl enable mongod")
    }
  })

  mongoCheck.on("close", (code) => {
    if (code === 0) {
      console.log("\n🔍 Checking if MongoDB service is running...")
      checkMongoService(platform)
    }
  })
}

function checkMongoService(platform) {
  let command, args

  if (platform === "win32") {
    command = "sc"
    args = ["query", "MongoDB"]
  } else if (platform === "darwin") {
    command = "brew"
    args = ["services", "list"]
  } else {
    command = "systemctl"
    args = ["status", "mongod"]
  }

  const serviceCheck = spawn(command, args, { shell: true })

  serviceCheck.stdout.on("data", (data) => {
    const output = data.toString()

    if (platform === "win32") {
      if (output.includes("RUNNING")) {
        console.log("✅ MongoDB service is running")
      } else {
        console.log("❌ MongoDB service is not running")
        console.log("💡 Start it with: net start MongoDB")
      }
    } else if (platform === "darwin") {
      if (output.includes("mongodb-community") && output.includes("started")) {
        console.log("✅ MongoDB service is running")
      } else {
        console.log("❌ MongoDB service is not running")
        console.log("💡 Start it with: brew services start mongodb-community")
      }
    } else {
      if (output.includes("active (running)")) {
        console.log("✅ MongoDB service is running")
      } else {
        console.log("❌ MongoDB service is not running")
        console.log("💡 Start it with: sudo systemctl start mongod")
      }
    }
  })

  serviceCheck.stderr.on("data", (data) => {
    console.log("⚠️  Could not check service status")
    console.log("Error:", data.toString())
  })

  serviceCheck.on("close", (code) => {
    console.log("\n🔍 Testing MongoDB connection...")
    testConnection()
  })
}

function testConnection() {
  const connectionTest = spawn("mongo", ["--eval", "db.adminCommand('ismaster')"], { shell: true })

  connectionTest.stdout.on("data", (data) => {
    console.log("✅ MongoDB connection successful!")
    console.log("Response:", data.toString())
  })

  connectionTest.stderr.on("data", (data) => {
    console.log("❌ MongoDB connection failed!")
    console.log("Error:", data.toString())

    console.log("\n💡 Common solutions:")
    console.log("1. Make sure MongoDB service is running")
    console.log("2. Check if port 27017 is available")
    console.log("3. Check MongoDB logs for errors")
    console.log("4. Try restarting MongoDB service")
  })

  connectionTest.on("close", (code) => {
    console.log("\n🏥 MongoDB Doctor diagnosis complete!")
    console.log("\nIf issues persist:")
    console.log("1. Check MongoDB logs")
    console.log("2. Verify MongoDB configuration")
    console.log("3. Ensure no firewall blocking port 27017")
    console.log("4. Try connecting with MongoDB Compass GUI")
  })
}

// Run the doctor
checkMongoDB()
