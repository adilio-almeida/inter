import { Router } from "express";
import userAuthentication from "../middlewares/userAuthenticator";
import PixController from "../resources/pix/pix.controllers"

const pixRouter = Router();
const pixController = new PixController()

pixRouter.use(userAuthentication);

pixRouter.post('/pay/:key', pixController.pay )
pixRouter.post('/request', pixController.request)
pixRouter.get('/transactions', pixController.transactions)

export default pixRouter;