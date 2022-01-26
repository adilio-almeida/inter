import { Router } from "express";
import userAuthentication from "../middlewares/userAuthenticator";
import { UserController } from '../resources/user/user.controllers';

const userRouter = Router();
const userController = new UserController()

userRouter.post('/signin', userController.signin )
userRouter.post('/signup', userController.signup)
userRouter.get('/me', userAuthentication, userController.me)

export default userRouter;