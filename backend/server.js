// const express = require('express')
// const app = express()
// const mysql = require('mysql')
// require("dotenv").config();
// const cors = require('cors')

// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//   // host: "localhost",
//   // user: "root",
//   // password: "2510",
//   // database: "db",
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT || 3306
// });


// // Custom DNS resolver (important for InfinityFree issues)
// const dns = require('dns');
// dns.setDefaultResultOrder('ipv4first'); // Forces IPv4 resolution

// db.connect((err) => {
//     if (err) {
//         console.error('Database connection failed:', err.message);
//         return;
//     }
//     console.log('Connected to the MySQL database');
// });

// db.connect((err) => {
//   if (err) {
//     console.error("Database connection failed:", err.message);
//     process.exit(1); // Exit the app if the database connection fails
//   }
//   console.log("Connected to the database.");
// });

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   // Log incoming request data
//   console.log("Request Body:", req.body);

//   if (!email || !password) {
//     console.error("Missing email or password");
//     return res.status(400).json({ message: "Email and password are required" });
//   }

//   const sql = "SELECT * FROM login WHERE username = ? AND password = ?";
//   const values = [email, password];

//   // Log SQL query values
//   console.log("SQL Query Values:", values);

//   db.query(sql, values, (err, data) => {
//     if (err) {
//       // Log database error
//       console.error("Database error:", err);
//       return res.status(500).json({ message: "Database error" });
//     }

//     // Check if user exists
//     if (data.length > 0) {
//       console.log("Login successful for user:", data[0]);
//       return res.json({ message: "Login successful!", user: data[0] });
//     } else {
//       console.warn("Invalid username or password");
//       return res.status(401).json({ message: "Invalid username or password" });
//     }
//   });
// });

// // Signup route (only stores username and password)
// app.post('/signup', (req, res) => {
//   const { username, password } = req.body; // Use 'username' and 'password'
//   // Simple validation to ensure both fields are provided
//   if (!username || !password) {
//     return res
//       .status(400)
//       .json({ message: "Username and password are required" });
//   }

//   // Insert username and password into the 'login' table (your table name)
//   const sql = `INSERT INTO login (username, password)
//                VALUES (?, ?)`;

//   const values = [username, password];

//   db.query(sql, values, (err) => {
//     if (err) {
//       console.error("Error inserting user:", err);
//       return res.status(500).json({ message: "User signup failed" });
//     }
//     res.status(200).json({ message: "User signed up successfully" });
//   });
// });

// app.listen(8081, ()=>{
//     console.log("listening...")
// })

// // app.get('/api', (req, res)=>{
// //     return res.json({message: 'this is from backend'})
// // })

const mysql = require("mysql2"); // Recommended for better performance
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

// Connect to Database
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1); // Exit the app on failure
  } else {
    console.log("✅ Connected to the MySQL database");
  }
});

// Auto-Reconnect Logic
db.on("error", (err) => {
  console.error("❌ Database error:", err.message);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    console.log("🔄 Reconnecting...");
    connectToDatabase(); // Auto-reconnect on disconnection
  }
});

// const dns = require("dns");
// dns.setDefaultResultOrder("ipv4first");
// const express = require("express");
// const mysql = require("mysql2"); // Updated to mysql2 for better performance
// require("dotenv").config();
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Database Connection Setup
// let db; // Declare a connection variable outside the function

// function connectToDatabase() {
//   if (!db) {
//     db = mysql.createConnection({
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//       port: process.env.DB_PORT || 3306,
//     });

//     db.connect((err) => {
//       if (err) {
//         console.error("❌ Database connection failed:", err.message);
//         db = null; // Reset connection variable
//         setTimeout(connectToDatabase, 5000); // Retry connection after 5 seconds
//         return;
//       }
//       console.log("✅ Connected to the MySQL database");
//     });

//     db.on("error", (err) => {
//       console.error("❌ Database error:", err.message);
//       if (err.code === "PROTOCOL_CONNECTION_LOST") {
//         console.log("🔄 Reconnecting...");
//         db = null; // Reset connection on failure
//         connectToDatabase(); // Auto-reconnect
//       }
//     });
//   }
// }

// // Connect to Database
// connectToDatabase();

// // Login Route
// app.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required" });
//   }

//   const sql = "SELECT * FROM login WHERE username = ? AND password = ?";
//   const values = [email, password];

//   db.query(sql, values, (err, data) => {
//     if (err) {
//       console.error("❌ Database error:", err);
//       return res.status(500).json({ message: "Database error" });
//     }

//     if (data.length > 0) {
//       return res.json({ message: "✅ Login successful!", user: data[0] });
//     } else {
//       return res
//         .status(401)
//         .json({ message: "❌ Invalid username or password" });
//     }
//   });
// });

// // Signup Route
// app.post("/signup", (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res
//       .status(400)
//       .json({ message: "Username and password are required" });
//   }

//   const sql = `INSERT INTO login (username, password) VALUES (?, ?)`;
//   const values = [username, password];

//   db.query(sql, values, (err) => {
//     if (err) {
//       console.error("❌ Error inserting user:", err);
//       return res.status(500).json({ message: "User signup failed" });
//     }
//     res.status(200).json({ message: "✅ User signed up successfully" });
//   });
// });

// // Test Route
// app.get("/api", (req, res) => {
//   return res.json({ message: "✅ Backend is working properly!" });
// });

// // Start Server
// const PORT = process.env.PORT || 8081;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
