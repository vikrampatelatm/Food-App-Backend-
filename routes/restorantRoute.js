import express from 'express';
import authMiddlware from '../middleware/authMiddleware.js';
import {createResturantController,deleteResturantController,getAllResturantController,getResturantByIdController} from '../controllers/restorantController.js';

const router = express.Router();

//Create resturant 
router.post('/create',createResturantController)
//get all resturants
router.get('/getAll',getAllResturantController)
//get resturantById
router.get('/getResturant',getResturantByIdController)
//delete resturant
router.delete('/delete/:id',deleteResturantController)
export default router;