import { getRepository } from "typeorm"
import { User } from "../../entity/User"
import md5 from 'crypto-js/md5'

import {UserSignIn} from "./dtos/user.signin.dtos"
import {UserSignUp} from "./dtos/user.signup.dtos"
import AppError from "../../shared/error/AppError"

export default class UserService {

    async signIn(user: UserSignIn) {
        console.log(md5('inhame').toString());
        
        const userRepository = getRepository(User)
        const {email, password} = user
        const passwordHash = md5(password).toString()

        const existuser = await userRepository.findOne({where: {email, password: passwordHash}})

        if(!existuser) {
            throw new AppError('Usuário não encontrado', 401)
        }

        return existuser;
        
    }

    async signUp(user: UserSignUp) {

    }

}