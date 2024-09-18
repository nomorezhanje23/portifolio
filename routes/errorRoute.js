/*   *******************************************************
 *  Account routes
 *  Unit 3, deliver login view activity
 *   *************************************************** */
// Needed Resources 
const express = require("express")
const router = new express.Router() 
const errorController = require("../controllers/errorController")
const utilities = require("../utilities/index")


/*   *******************************************************
 *  Deliver login view
 *  Unit 3, deliver login view activity
 *   *************************************************** */
router.get("/error", utilities.handleErrors(errorController.buildLogin))


module.exports = router;