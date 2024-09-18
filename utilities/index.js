const invModel = require("../models/inventory-model")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  /*console.log(data) Note from Activity 3*/
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNam = async function (req, res, next) {
  let data = await invModel.getClassifications()
  /*console.log(data) Note from Activity 3*/
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}



/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      //opening link for the whole page
 
grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model +' on CSE Motors"/>'
      '</a>'
      //the image link

      grid += '<div class="namePrice">'
      //opening div for the whole section
      grid += '<hr/>'
      //line break
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model + 'details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model +' </a>'
      grid += '</h2>'
      //h2 
      grid += '<span>$'+ new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'

      grid += '</div>'

      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
* Function to Build the inventory view HTML
* ************************************ */
Util.buildInventoryGrid = async function(data){
  let grid
  if(data.length > 0) {
    grid = '<ul id="inv-detail">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=   
      '<img src="' + vehicle.inv_image 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors">' + '</li>'
      grid += '<li class="flex-detail">' + '<h2>'
      grid += 
      + vehicle.inv_year + ' '+ vehicle.inv_make + ' ' + vehicle.inv_model
      grid += '</h2>'
      grid += '<span><strong>Price: $' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</strong>'+'</span>'
      grid += '<br>'
      grid += '<span><strong>Mileage:</strong>' + ' ' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_miles) + '</span>'
      grid += '<br>'
      grid += '<span><strong>Color:</strong>' + ' ' + vehicle.inv_color + '</span>'
      grid += '<p><strong>Description:</strong>' + ' ' + vehicle.inv_description + '</p>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}
9
/* ************************
 * Constructs the select HTML option list
 ************************** */
Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationList =
  '<select name="classification_id" id="classification_id" value="<%= locals.classification_id %>" >'
  classificationList += "<option selected disabled hidden>Choose a Classification</option>"
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"'
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected "
    }
    classificationList += ">" + row.classification_name + "</option>"
  })
  classificationList += "</select>"
  return classificationList
}

  /* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)


/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
   jwt.verify(
    req.cookies.jwt,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, accountData) {
     if (err) {
      req.flash("Please log in")
      res.clearCookie("jwt")
      return res.redirect("/account/login")
     }
     res.locals.accountData = accountData
     res.locals.loggedin = 1
     next()
    })
  } else {
   next()
  }
 }

 /* ****************************************
 *  Check Login
 * ************************************ */
 Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next()
  } else {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
 }

 Util.checkAccount = (req, res, next) => {
  // Check if the user is logged in
  if (res.locals.loggedin) {
    // Check if the account type is "Employee" or "Admin"
    if (
      res.locals.accountData.account_type === "Employee" ||
      res.locals.accountData.account_type === "Admin"
    ) {
      // User has the correct account type, proceed to the next middleware
      next();
    } else {
      req.flash("notice", "Insufficient privileges.")
      return res.redirect("/account/login")
    }
  } else {
    // User is not logged in, redirect to login page
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
}


module.exports = Util