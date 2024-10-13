const utilities = require("../utilities");
const invModel = require("../models/inventory-model");
const { body, validationResult } = require("express-validator");
const validate = {};

/* **********************************
 *  Add Classification Data Validation Rules
 * ********************************* */
validate.classificationRules = () => {
  return [
    // Classification name is required and must be alphanumeric
    body("classification_name")
      .trim()
      .escape()
      .notEmpty()
      .isAlphanumeric()
      .isLength({ min: 1 })
      .withMessage("Please provide a valid classification name."),
  ];
};

/* ******************************
 * Check classification data and return errors or continue
 * ***************************** */
validate.checkClassificationData = async (req, res, next) => {
  const { classification_name } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const nav = await utilities.getNav();
    res.render("inventory/addClassification", {
      errors,
      title: "Add Classification",
      nav,
      classification_name,
    });
    return;
  }
  next();
};

/* **********************************
 *  Add Inventory Data Validation Rules
 * ********************************* */
validate.inventoryRules = () => {
  return [
    // Make is required and must be a string
    body("inv_make")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Make value is missing.")
      .isLength({ min: 1 })
      .withMessage("Please provide a make."),

    // Model is required
    body("inv_model")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a model."),

    // Year is required and must be numeric
    body("inv_year")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Year value missing.")
      .isNumeric()
      .withMessage("Year must be a number."),

    // Description is required
    body("inv_description")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a description."),

    // Image URL is required
    body("inv_image")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide an image."),

    // Thumbnail URL is required
    body("inv_thumbnail")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a thumbnail."),

    // Price is required and must be numeric
    body("inv_price")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Price value is missing.")
      .isNumeric()
      .withMessage("Price must be a number."),

    // Mileage is required and must be numeric
    body("inv_miles")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Miles value is missing.")
      .isNumeric()
      .withMessage("Miles must be a number."),

    // Color is required
    body("inv_color")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a color."),

    // Classification ID is required and must be an integer
    body("classification_id")
      .trim()
      .escape()
      .notEmpty()
      .isInt()
      .withMessage("Please provide a valid classification ID."),
  ];
};

/* ******************************
 * Check inventory data and return errors or continue
 * ***************************** */
validate.checkInventoryData = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const {
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
    } = req.body;
    
    const classifications = await utilities.buildClassificationList(classification_id);
    const nav = await utilities.getNav();
    
    res.render("inventory/addInventory", {
      errors,
      title: "Add Inventory",
      nav,
      classifications,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
    });
    return;
  }
  next();
};

/* ******************************
 * Check update data and return errors or continue
 * ***************************** */
validate.checkUpdateData = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const {
      inv_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
    } = req.body;

    const classifications = await utilities.buildClassificationList(classification_id);
    const nav = await utilities.getNav();
    
    res.render("inventory/editInventory", {
      errors,
      title: `Edit ${inv_make} ${inv_model}`,
      nav,
      classifications,
      inv_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
    });
    return;
  }
  next();
};

module.exports = validate;
