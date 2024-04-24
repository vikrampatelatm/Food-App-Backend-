import express from 'express';
import testController from '../controllers/testController.js';

//router object
const router = express.Router();


//routes GET | POST | UPDATE | DELETE
router.get('/test-user',testController)




export default router;