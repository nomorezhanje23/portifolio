const utilities = require(".")
//const inventoryModel = require("../models/inventory-model")
const { body, validationResult } = require("express-validator")
const validate = {}

validate.additionRules = () => {
    return [
      // inv is required and must be string
      body("inv_make")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Please fill out the make field"), // on error this message is sent.
  
      // model is required and must be string
      body("inv_model")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Please fill out the model field"), // on error this message is sent.

      // description, is required and must be string
      body("inv_description")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Please fill out the description field"), // on error this message is sent.

        // image, is required and must be string
      body("inv_image")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please fill out the image field of your choice"), // on error this message is sent.

     // inv_thumbnail, is required and must be string
     body("inv_thumbnail")
     .trim()
     .isLength({ min: 3 })
     .withMessage("Please fill out the image_thumbnail field of your choice"), // on error this message is sent.

    // inv_price, is required and must be string
    body("inv_price")
    .trim()
    .custom(value => /^\d+(\.\d+)?$/.test(value))
    .withMessage('Invalid number format')
    .isLength({ min: 3 })
    .withMessage("Price field: Whole and decimal numbers only, no spaces"), // on error this message is sent.

    // inv_year, is required and must be string
    body("inv_year")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Please fill out the year field!"), // on error this message is sent.

    // inv_miles, is required and must be integer
    body("inv_miles")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Miles field: Whole numbers only, no spaces & decimals."), // on error this message is sent.

    // description, is required and must be string
    body("inv_color")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Please fill out the color field"), // on error this message is sent.
    ]
  }

  validate.UpdateRules = () => {
    return [
      // inv is required and must be string
      body("inv_make")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Please fill out the make field"), // on error this message is sent.
  
      // model is required and must be string
      body("inv_model")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Please fill out the model field"), // on error this message is sent.

      // description, is required and must be string
      body("inv_description")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Please fill out the description field"), // on error this message is sent.

        // image, is required and must be string
      body("inv_image")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please fill out the image field of your choice"), // on error this message is sent.

     // inv_thumbnail, is required and must be string
     body("inv_thumbnail")
     .trim()
     .isLength({ min: 3 })
     .withMessage("Please fill out the image_thumbnail field of your choice"), // on error this message is sent.

    // inv_price, is required and must be string
    body("inv_price")
    .trim()
    .custom(value => /^\d+(\.\d+)?$/.test(value))
    .withMessage('Invalid number format')
    .isLength({ min: 3 })
    .withMessage("Price field: Whole and decimal numbers only, no spaces"), // on error this message is sent.

    // inv_year, is required and must be string
    body("inv_year")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Please fill out the year field!"), // on error this message is sent.

    // inv_miles, is required and must be integer
    body("inv_miles")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Miles field: Whole numbers only, no spaces & decimals."), // on error this message is sent.

    // description, is required and must be string
    body("inv_color")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Please fill out the color field"), // on error this message is sent.
    ]
  }


  /* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkAddData = async (req, res, next) => {
    const {  inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, 
      inv_price, inv_miles , inv_color, classification_id } = 
    req.body
    let errors = []
    console.log("inv_description", inv_description) // here we are puting the actual variable which will tell us if we are getting the info right before we pass it to the view
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav() 
      let classification = await utilities.buildClassificationList(classification_id)
      res.render("./inventory/add-inventory", {
        errors,
        title: "Add New Inventory",
        nav,
        inv_make,
        inv_model, 
        inv_description, 
        inv_image, 
        inv_thumbnail, 
        inv_price, 
        inv_year,
        inv_miles, 
        inv_color,
        classification_id,
        classification
      })
      return
    }
    next()
  }
  //midleware to check the data being passed
  validate.checkUpdateData = async (req, res, next) => {
    const {  inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, 
      inv_price, inv_miles , inv_color, classification_id, inv_id } = 
    req.body
    let errors = []
    console.log("inv_description", inv_description) // here we are puting the actual variable which will tell us if we are getting the info right before we pass it to the view
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav() 
      let classification = await utilities.buildClassificationList(classification_id)
      render("./inventory/management",{
        title:"Vehicle Management",
        errors,
        title: 
        nav,
        inv_make,
        inv_model, 
        inv_description, 
        inv_image, 
        inv_thumbnail, 
        inv_price, 
        inv_year,
        inv_miles, 
        inv_color,
        classification_id,
        classification,
        inv_id
      })
      return
    }
    next()
  }
  validate.classadditionRules = () => {
    return [
     // class is required and must be string
     body("classification_name")
     .trim()
     .notEmpty().withMessage('Name is required')
     .matches(/^[^\s]+$/).withMessage('Name should not contain spaces')
     .isLength({ min: 3 })
     .withMessage("Classification name should have alphabetic characters only, no spaces allowed"), // on error this message is sent.
      ]
    }



    /* ******************************
 * Check data and return errors or continue to class addition
 * ***************************** */
validate.checkclassData = async (req, res, next) => {
  const { classification_name } = 
  req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav() 
    //let classification = await utilities.buildClassificationList()
    res.render("./inventory/add-classification", {
      errors,
      title: "Add New Classification",
      nav,
      classification_name
      
    })
    return
  }
  next()
} 

  module.exports = validate