/*   *******************************************************
 *  ACCOUNT CONTROLLER for error
 *  Unit 3, deliver login view activity
 *   *************************************************** */
const utilities = require("../utilities/")

/*   *******************************************************
 *  Deliver login view
 *  Unit 3, error view activity
 *   *************************************************** */
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/error", {
      title: "Server Error",
      nav,
    })
  }
  
  module.exports = { buildLogin }