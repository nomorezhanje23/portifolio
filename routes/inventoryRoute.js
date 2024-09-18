// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const addValidate = require('../utilities/management-validation')


// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryId));

router.get("/", 
utilities.checkAccount,
utilities.handleErrors(invController.buildManagement));
// Route to build add-classification view
router.get("/add-classification", 
utilities.checkAccount,
utilities.handleErrors(invController.buildAddClassification));
// router.get("/add-classification", invController.buildAddClassification);
// Route to build add-inventory view
router.get("/add-inventory", 
utilities.checkAccount,
utilities.handleErrors(invController.buildAddInventory));
//Process the Json data
router.get("/getInventory/:classification_id", 
  //utilities.checkAccountType,
  utilities.handleErrors(invController.getInventoryJSON))

//route to edit inventory items
router.get("/edit/:inv_id", 
utilities.checkAccount,
utilities.handleErrors(invController.editInventoryView))
//route to delete
router.get("/delete/:inv_id",
utilities.checkAccount,
utilities.handleErrors(invController.deleteView))


// add classification 
router.post("/add-classification", 
 addValidate.classadditionRules(),
 addValidate.checkclassData,
 utilities.handleErrors(invController.addClassification))

/*   *******************************************************
 *  Process Registration
 *  Unit 4, Process registration activity
 *   ****************************************************/

// Process the registration data
router.post(
    "/add-inventory",
    addValidate.additionRules(),
    addValidate.checkAddData,
    utilities.handleErrors(invController.addInventory)
 )
//produces the view
//  router.post(
//   "/edit",
//  addValidate.additionRules(),
//  addValidate.checkAddData, 
//  utilities.handleErrors(invController.editInventoryView))

 //updating router
 router.post("/update/",
 addValidate.UpdateRules(),
 addValidate.checkUpdateData,
 utilities.handleErrors(invController.updateInventory))



// Route to process the add new classification data and send data to the database (Siya so don't chanje anything)
// router.post(
//     "/add-classification",
//     invValidate.classificationRules(),
//     invValidate.checkClassificationData,
//     utilities.handleErrors(invController.addClassification)
// )

module.exports = router;

