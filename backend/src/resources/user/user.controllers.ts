import { Request, Response } from "express";

export class UserController {

    async signin(req: Request, res: Response) {
        return res.send('Retorno do controller in')
    }

    async signup(req: Request, res: Response) {
        return res.send('Retorno do controller up')
    }
}