// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../../Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import Env from '@ioc:Adonis/Core/Env'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
    public async viewAll(request){
        const reque = request
        console.log(reque);
        return {
            from:'auth',
            data: reque,
        }
    }

    public async loginJwt({request, response}){
        const UserSchema = schema.create({
            username: schema.string(),
            password: schema.string([
                rules.required()
            ])
        })

            const payload = await request.validate({
                schema: UserSchema
            })

        const username = request.body().username;
        const password = request.body().password;

        const user = await User.findBy('username', username);

        if(!user){
            return response.status(400).send({
                'message' : 'Username Not Found'
            })
        }

        const credetential = await Hash.verify(user.password, password);

        if(credetential){
            const token = jwt.sign({sub:user.id, username:user.username}, Env.get('JWT_SECRET',''),{expiresIn:Env.get('JWT_DURATION','1m')})
            const decode = jwt.verify(token, Env.get('JWT_SECRET',''))
            const expires = moment.unix(decode.exp);
            return response.status(200).send({
                access_toke: token,
                expires: expires.format()
            });
        }

        return response.status(403).send({
            message: 'Unauthorize'
        })
    }

    /**
     * Login With Api TOken
     */
    public async login({request, response, auth}){
        const body = request.body();
        const username = body.username;

        const user = await User.findBy('username',username)

        if(!user){
            return response.status(400).send({
                'message' : 'Username Not Found'
            })
        }

        const userPass = user.password;
        const credetential = await Hash.verify(userPass, body.password);

        if(credetential){
            const token = await auth.use("api").generate(user,{
                expiresIn:'1m'
            });
            return response.status(200).send({
                access_token: token
            });
        }

        return response.status(403).send({
            message: 'Unauthorize'
        })
        
    }

    /**
     * Logout With Api Tokens
     */
    public async logout({response, auth}){
        await auth.use('api').revoke();
        return response.status(200).send({
            revoke: true
        })
    }
}
