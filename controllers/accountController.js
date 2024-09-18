/*   *******************************************************
 *  ACCOUNT CONTROLLER
 *  Unit 4, deliver login view activity
 *   *************************************************** */
const utilities = require("../utilities/")
const accountModel = require("../models/account-model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()


/*   *******************************************************
 *  Deliver login view
 *  Unit 4, deliver login view activity
 *   *************************************************** */
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      title: "Login",
      nav,
    })
  }

  /*   *******************************************************
 *  Deliver Register view
 *  Unit 4, deliver register view activity
 *   *************************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/register", {
    title: "Registration",
    nav,
    errors: null,
  })
}

/* ***************************
 *  Build account management view
 * ************************** */
async function buildAccountManagement(req, res, next) {
  let nav = await utilities.getNav()
  res.render("./account/management", {
      title: "Account Management",
      nav,
      errors: null,
  })
}

/* ****************************************
*  Process Registration
* *************************************** */


async function registerAccount(req, res) {
  let nav = await utilities.getNav()
  const { 
    account_firstname, 
    account_lastname, 
    account_email, 
    account_password,
  } = req.body

   // Hash the password before storing
   let hashedPassword
   try {
     // regular password and cost (salt is generated automatically)
     hashedPassword = await bcrypt.hashSync(account_password, 10)
   } catch (error) {
     req.flash(
      "notice", 
      "Sorry, there was an error processing the registration."
      )
     res.status(500).render("account/register", {
       title: "Registration",
       nav,
       errors: null,
     })
   }

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  )

  if (regResult) {
    req.flash("notice", "Congratulations, you\'re registered " + `${account_firstname}.` + " Please log in.")
    res.status(201).render("account/login", {
      title: "Login",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
    })
  }
}
  
/* ****************************************
 *  Process login request
 * ************************************ */
async function accountLogin(req, res) {
  let nav = await utilities.getNav()
  const { account_email, account_password } = req.body
  const accountData = await accountModel.getAccountByEmail(account_email)
  if (!accountData) {
   req.flash("notice", "Please check your credentials and try again.")
   res.status(400).render("account/login", {
    title: "Login",
    nav,
    errors: null,
    account_email,
   })
  return
  }
  try {
   if (await bcrypt.compare(account_password, accountData.account_password)) {
   delete accountData.account_password
   const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
   res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
   return res.redirect("/account/")
   }
  } catch (error) {
   return new Error('Access Forbidden')
  }
 }


/* ****************************************
 * Edit account view
 * ************************************ */
async function buildEditAccount(req, res, next) {
  let nav = await utilities.getNav()
  let account = res.locals.accountData
  const account_id = parseInt(req.params.account_id)
  res.render("account/edit-account", {
    title: "Edit Account Information",
    nav,
    errors: null,
    account_firstname: account.account_firstname,
    account_lastname: account.account_lastname,
    account_email: account.account_email,
    account_id: account_id,
  })
}

/* ****************************************
 *  Logout user
 * ************************************ */

async function logoutAccount(req, res, next) {
  res.clearCookie('jwt')
  res.redirect("/")
  return
}

/* ****************************************
 *  Processing the updated information
 * ************************************ */

async function editAccountInformation(req, res) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_id } = req.body
  
  const regResult = await accountModel.updateAccountInformation(account_firstname, account_lastname, account_email, account_id)
  if (regResult) {
    res.clearCookie("jwt")
    const accountData = await accountModel.getAccountById(account_id)
    const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
    res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })

    req.flash("success", `Congratulations, ${account_firstname} your information has been updated`)
    return res.redirect("/account/");
    // res.status(201).render("/account/", {
    //   title: "Account Management",
    //   nav,
    //   errors:null,
    //   account_firstname,
    //   account_lastname,
    //   account_email,
   // })
  } else {
    req.flash("error", "Sorry, the update failed.")
    res.status(501).render("account/edit-account", {
      title: "Edit Account Information",
      nav,
      errors: null,
      account_firstname: account_firstname,
      account_lastname: account_lastname,
      account_email: account_email,
    })
  }
}

/* ****************************************
*  Processing the updated password
* *************************************** */
async function editAccountPassword(req, res) {
  let nav = await utilities.getNav()
  const { account_password, account_id } = req.body

  let hashedPassword
  try {
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/edit-account", {
      title: "Registration",
      nav,
      errors: null,
    })
  }
 
  const regResult = await accountModel.changeAccountPassword(hashedPassword, account_id)
  
  if (regResult) {
    const account = await accountModel.getAccountById(account_id)
    req.flash("success", `Congratulations, ${account.account_firstname} your Password has been updated successfully.`)
    return res.redirect("/account/");
    // res.status(201).render("/account/", {
    //   title: "Account Management",
    //   nav,
    //   errors:null,
    //   account_firstname: account.account_firstname,
    // })
  } else {
    
    req.flash("error", "Sorry, the update failed.")
    res.status(501).render("account/edit-account", {
      title: "Edit Account Information",
      nav,
      errors: null,
    })
  }
}


  module.exports = { buildLogin, buildRegister, registerAccount, accountLogin, buildAccountManagement, buildEditAccount, logoutAccount,  editAccountInformation, editAccountPassword  }