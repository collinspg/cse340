/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const env = require("dotenv").config();
const session = require("express-session");
const bodyParser = require("body-parser"); 
const pool = require('./database/');
const app = express();
const static = require("./routes/static");
const baseController = require("./controllers/baseController");
const inventoryRoute = require("./routes/inventoryRoute");
const utilities = require("./utilities/");
const accountRoute = require('./routes/accountRoute');




/* ***********************
* Middleware
************************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function(req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root

/* ***********************
 * Routes
 *************************/
app.use("/account", require("./routes/accountRoute"))

app.use(static)

// Inventory routes
app.use("/inv", inventoryRoute)

// Index route
app.get("/", utilities.handleErrors(baseController.buildHome))

// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})


/* ***********************
 * Express Error Handler
 * Place after all other middleware
 *************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  const message = err.status == 404 ? err.message : 'Oh no! There was a crash. Maybe try a different route?'
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  })
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/

// Use default values if environment variables are not set
const port = process.env.PORT || 3000; // Default to port 3000
const host = process.env.HOST || '0.0.0.0'; // Default to listen on all interfaces

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, host, () => { // Use host in listen
  console.log(`app listening on http://${host}:${port}`) // Log with the correct URL format
})