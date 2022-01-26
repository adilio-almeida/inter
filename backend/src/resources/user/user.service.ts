import { getRepository } from "typeorm"
import {sign} from 'jsonwebtoken'
import { User } from "../../entity/User"
import md5 from 'crypto-js/md5'
import authConfig from '../../config/auth'

import {UserSignIn} from "./dtos/user.signin.dtos"
import {UserSignUp} from "./dtos/user.signup.dtos"
import AppError from "../../shared/error/AppError"

export default class UserService {

    async signIn(user: UserSignIn) {    
        const userRepository = getRepository(User)
        const {email, password} = user
        const passwordHash = md5(password).toString()

        const existuser = await userRepository.findOne({where: {email, password: passwordHash}})

        if(!existuser) {
            throw new AppError('Usuário não encontrado', 401)
        }

        const {secret, expiresIn} = authConfig.jwt

        const token = sign({
            firstName: existuser.firstName,
            lastName: existuser.lastName,
            accountNumber: existuser.accountNumber,
            accountDigit: existuser.accountDigit,
            wallet: existuser.wallet
        }, secret, {
            subject: existuser.id, 
            expiresIn,
        })
        // @ts-expect-error
        delete existuser.password

        return {token}
        
    }

    async signUp(user: UserSignUp) {
        const userRepository = getRepository(User)
        const existUser = await userRepository.findOne({where: {email: user.email}})

        if(existUser) {
            throw new AppError('Já existe um usuário cadastrado come esse email.', 401)
        }

        const userData = {
            ...user,
            password: md5(user.password).toString(),
            wallet: 0,
            accountNumber: Math.floor(Math.random() * 999999),
            accountDigit: Math.floor(Math.random() * 99)
        }

        const userCreate = await userRepository.save(userData)

        const {secret, expiresIn} = authConfig.jwt

        const token = sign({
            firstName: user.firstName,
            lastName: user.lastName,
            accountNumber: userData.accountNumber,
            accountDigit: userData.accountDigit,
            wallet: userData.wallet
        }, secret, {
            subject: userCreate.id, 
            expiresIn,
        })
        // @ts-expect-error
        delete userCreate.password

        return {acessToken: token}

    }

}