import express from 'express';
import {
    findAll,
	loginAdmin,
	loginUser,
	registerUser,
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/findAllUsers', findAll);
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/adminRegister', loginAdmin);

export default userRouter;
