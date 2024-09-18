const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
    try {
      const data = await pool.query(
        `SELECT * FROM public.inventory AS i 
        JOIN public.classification AS c 
        ON i.classification_id = c.classification_id 
        WHERE i.classification_id = $1`,
        [classification_id]
      )
      return data.rows
    } catch (error) {
      console.error("getclassificationsbyid error " + error)
    }
  }

  async function getInventoryByInventoryId(inv_id) {
    try {
      const data = await pool.query(
        `SELECT * FROM public.inventory
        WHERE inv_id = $1`,
        [inv_id]
      )
      return data.rows
    } catch (error) {
      console.error("getinventoryid error " + error)
    }
  }

/* ****************************************
 *  Add new classification to the database
 * ****************************************** */

  async function addNewClassification(classification_name) {
    try {
      const sql = "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *"
      return await pool.query(sql, [classification_name])
    } catch (error) {
      // console.error("addnewclassification error" +error)
      return error.message
    }
  }

  /* ****************************************
 *  Add new inventory to the database
 * ****************************************** */

  async function addInventory( inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles , inv_color, classification_id ) { 
      //testing t the terminal
     // console.log("Model when called", inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles , inv_color, classification_id)
    try { const sql = "INSERT INTO public.inventory (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles , inv_color, classification_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)  RETURNING *;"
      const data = await pool.query(sql, [inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles , inv_color, classification_id ])
      console.log("This is database answer", data)
      return data.rows[0]
    } catch (error) {
      //console.error("model error: " + error)
      return error.message
    }
  }


  async function updateInventory( 
    inv_make, 
    inv_model, 
    inv_year, 
    inv_description,
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_miles ,
    inv_color, 
    classification_id,
    inv_id
       ) { 
    //testing t the terminal
   // console.log("Model when called", inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles , inv_color, classification_id)
  try 
  { 
    const sql = 
    "UPDATE public.inventory SET inv_make = $1, inv_model = $2, inv_year = $3, inv_description = $4, inv_image= $5 , inv_thumbnail = $6, inv_price = $7, inv_miles = $8, inv_color = $9, classification_id = $10 WHERE inv_id = $11 RETURNING *;"
    const data = await pool.query(sql, [inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles , inv_color, classification_id, inv_id ])
    console.log("This is database answer", data)
    return data.rows[0]
  } catch (error) {
    //console.error("model error: " + error)
    return error.message
  }
}



/* ***************************
 *  Delete Inventory Item
 * ************************** */
async function deleteInventoryItem(inv_id) {
  try {
    const sql = 'DELETE FROM inventory WHERE inv_id = $1'
    const data = await pool.query(sql, [inv_id])
  return data
  } catch (error) {
    new Error("Delete Inventory Error")
  }
}

module.exports = {getClassifications, getInventoryByClassificationId, getInventoryByInventoryId, addNewClassification, addInventory, updateInventory, deleteInventoryItem}//checkExistingName