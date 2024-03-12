// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// const mysql = require("mysql");

// // Create MySQL connection
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "mysql123",
//   database: "bmi",
// });

// // User login
// router.post("/login", (req, res) => {
//   // Extract username and password from request body
//   const { username, password } = req.body;

//   // Check if username exists in database
//   connection.query(
//     "SELECT * FROM users WHERE username = ?",
//     [username],
//     (err, results) => {
//       if (err) {
//         console.error("Error retrieving user:", err);
//         res.status(500).json({ error: "Internal Server Error" });
//         return;
//       }

//       if (results.length === 0) {
//         res.status(401).json({ error: "Invalid username or password" });
//         return;
//       }

//       // Compare hashed password
//       const user = results[0];
//       bcrypt.compare(password, user.password, (err, result) => {
//         if (err) {
//           console.error("Error comparing passwords:", err);
//           res.status(500).json({ error: "Internal Server Error" });
//           return;
//         }

//         if (!result) {
//           res.status(401).json({ error: "Invalid username or password" });
//           return;
//         }

//         res.json({
//           message: "Login successful",
//           user: { id: user.id, username: user.username },
//         });
//       });
//     }
//   );
// });

// router.post("/signup", (req, res) => {
//   // Extract username, password, and email from request body
//   const { username, password, email } = req.body;

//   // Hash password
//   bcrypt.hash(password, 10, (err, hashedPassword) => {
//     if (err) {
//       console.error("Error hashing password:", err);
//       res.status(500).json({ error: "Internal Server Error1" });
//       return;
//     }

//     // Store user data in database
//     connection.query(
//       "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
//       [username, hashedPassword, email],
//       (err, results) => {
//         if (err) {
//           console.error("Error storing user:", err);
//           res.status(500).json({ error: "Internal Server Error2" });
//           return;
//         }

//         res.json({ message: "User registered successfully" });
//       }
//     );
//   });
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// const mysql = require("mysql");

// // Create MySQL connection
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "mysql123",
//   database: "bmi",
// });

// // User login
// router.post("/login", (req, res) => {
//   // Extract username and password from request body
//   const { username, password } = req.body;

//   // Check if username exists in database
//   connection.query(
//     "SELECT * FROM users WHERE username = ?",
//     [username],
//     (err, results) => {
//       if (err) {
//         console.error("Error retrieving user:", err);
//         res.status(500).json({ error: "Internal Server Error" });
//         return;
//       }

//       if (results.length === 0) {
//         res.status(401).json({ error: "Invalid username or password" });
//         return;
//       }

//       // Compare hashed password
//       const user = results[0];
//       bcrypt.compare(password, user.password, (err, result) => {
//         if (err) {
//           console.error("Error comparing passwords:", err);
//           res.status(500).json({ error: "Internal Server Error" });
//           return;
//         }

//         if (!result) {
//           res.status(401).json({ error: "Invalid username or password" });
//           return;
//         }

//         res.json({
//           message: "Login successful",
//           user: { id: user.id, username: user.username },
//         });
//       });
//     }
//   );
// });

// // User signup
// router.post("/signup", (req, res) => {
//   // Extract username, password, and email from request body
//   const { username, password, email } = req.body;

//   // Hash password
//   bcrypt.hash(password, 10, (err, hashedPassword) => {
//     if (err) {
//       console.error("Error hashing password:", err);
//       res.status(500).json({ error: "Internal Server Error" });
//       return;
//     }

//     // Store user data in database
//     connection.query(
//       "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
//       [username, hashedPassword, email],
//       (err, results) => {
//         if (err) {
//           console.error("Error storing user:", err);
//           if (err.code === 'ER_DUP_ENTRY') {
//             res.status(400).json({ error: "User already registered" });
//           } else {
//             res.status(500).json({ error: "Internal Server Error" });
//           }
//           return;
//         }

//         res.json({ message: "User registered successfully" });
//       }
//     );
//   });
// });

// module.exports = router;
// Import necessary modules
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mysql = require("mysql");

// Create MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql123",
  database: "bmi",
});

// User login
router.post("/login", (req, res) => {
  // Extract username and password from request body
  const { username, password } = req.body;

  // Check if username exists in database
  connection.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.error("Error retrieving user:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      if (results.length === 0) {
        res.status(401).json({ error: "Invalid username or password" });
        return;
      }

      // Compare hashed password
      const user = results[0];
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }

        if (!result) {
          res.status(401).json({ error: "Invalid username or password" });
          return;
        }

        res.json({
          message: "Login successful",
          user: { id: user.id, username: user.username },
        });
      });
    }
  );
});

// User signup
router.post("/signup", (req, res) => {
  // Extract username, password, and email from request body
  const { username, password, email } = req.body;

  // Hash password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // Store user data in database
    connection.query(
      "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
      [username, hashedPassword, email],
      (err, results) => {
        if (err) {
          console.error("Error storing user:", err);
          if (err.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: "User already registered" });
          } else {
            res.status(500).json({ error: "Internal Server Error" });
          }
          return;
        }

        res.json({ message: "User registered successfully" });
      }
    );
  });
});

module.exports = router;
