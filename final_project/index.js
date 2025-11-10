const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

// Session middleware (must come first)
app.use("/customer", session({
  secret: "fingerprint_customer",
  resave: true,
  saveUninitialized: true
}));

// MOUNT AUTHENTICATED ROUTES
app.use("/customer", customer_routes);  // ← /register, /login, /auth/review

// MOUNT GENERAL (PUBLIC) ROUTES
app.use("/", genl_routes);  // ← /, /isbn/1, /author/austen, etc.

const PORT = 5000;

app.listen(PORT, () => console.log("Server is running"));