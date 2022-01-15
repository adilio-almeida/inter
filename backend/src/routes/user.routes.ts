import { Router } from "express";
import { UserController } from '../resources/user/user.controllers';

const userRouter = Router();
const userController = new UserController()

userRouter.get('/signin', userController.signin )
userRouter.get('/signup', userController.signup)

export default userRouter;