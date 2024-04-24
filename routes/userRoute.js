import express from 'express';
import {getUserController,updateUserController,updatePasswordController, resetPasswordController,deleteUserController} from '../controllers/userController.js';
import authMiddlwware from '../middleware/authMiddleware.js';

const router = express.Router();

//GET USER || GET
router.get('/getUser',authMiddlwware,getUserController)

//UPDATE 
router.put('/updateUser',authMiddlwware,updateUserController)

//Password Update
router.put('/updatePassword',authMiddlwware,updatePasswordController)

//Password reset
router.put('/resetPassword',resetPasswordController)


//Delete profile
router.delete('/deleteUser/:id',authMiddlwware,deleteUserController)

export default router;