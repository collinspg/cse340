const regValidate = require('../utilities/account-validation')
const express = require("express");
const router = express.Router();
const utilities = require("../utilities"); // Ensure this path is correct
const accountController = require("../controllers/accountController");

// Route to build login view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Route to build registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister)); 

// Process the registration data
router.post(
    "/register",
    regValidate.registrationRules(), // Apply validation rules
    regValidate.checkRegData, // Check for errors
    utilities.handleErrors(accountController.registerAccount) // If no errors, proceed to the controller
  )

module.exports = router;
