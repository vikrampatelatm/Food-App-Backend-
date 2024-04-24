import express from "express"

import authMiddlware from "../middleware/authMiddleware.js";
import  {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByResturantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
} from "../controllers/foodController.js"


const router = express.Router();

//routes
//CREATE FOOD
router.post("/create", authMiddlware, createFoodController);

//GET ALL FOOD
router.get("/getAll", getAllFoodsController);

// GET SINGLE FOOD
router.get("/get/:id", getSingleFoodController);

// GET  FOOD by rest
router.get("/getByResturant/:id", getFoodByResturantController);

// UPDATE FOOD
router.put("/update/:id", authMiddlware, updateFoodController);

// DELETE FOOD
router.delete("/delete/:id", authMiddlware, deleteFoodController);

// PLACE ORDER
router.post("/placeorder", authMiddlware , placeOrderController);

// ORDER STATUS
router.post(
  "/orderStatus/:id",
  orderStatusController
);

export default router;