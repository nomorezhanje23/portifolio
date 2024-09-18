/*   *******************************************************
 *  Account routes
 *  Unit 4, deliver login view activity
 *   *************************************************** */
// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/index")
const regValidate = require('../utilities/account-validation')



/*   *******************************************************
 *  Deliver login view
 *  Unit 4, deliver login view activity
 *   *************************************************** */
router.get("/login", utilities.handleErrors(accountController.buildLogin))

/*   *******************************************************
 *  Deliver Register view
 *  Unit 4, deliver register view activity
 *   *************************************************** */
router.get("/register", utilities.handleErrors(accountController.buildRegister))

/*   *******************************************************
 *  Deliver Account Management view
 *  Unit 5, deliver management view activity
 *   *************************************************** */

router.get("/",
utilities.checkLogin,
//utilities.checkAccount,
utilities.handleErrors(accountController.buildAccountManagement))

/*   *******************************************************
 *  Process Registration
 *  Unit 4, Process registration activity
 *   ****************************************************/

// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  )


//Process the Log in
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin))
//Assignment 5

router.get(
  "/logout",
  utilities.handleErrors(accountController.logoutAccount)
)

router.get(
  "/edit/:account_id",
  utilities.handleErrors(accountController.buildEditAccount)
)

router.post(
  "/accountupdate",
  regValidate.updateAccountRules(),
  regValidate.checkEditAccountData,
  utilities.handleErrors(accountController.editAccountInformation)
)


router.post(
  "/changepassword",
  regValidate.changePasswordRules(),
  regValidate.checkEditAccountData,
  utilities.handleErrors(accountController.editAccountPassword)
)

module.exports = router;

