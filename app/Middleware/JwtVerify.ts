import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User';

export default class JwtVerify {
  public async handle({request, response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL

     const authorization = request.header('Authorization');
     const token = authorization?.split(' ')[1] || '';

     if(!authorization){
        return response.status(403).send({
          message: 'Token Not Found'
        })
     }

     try {
        const decoded = jwt.verify(token, Env.get('JWT_SECRET',''))
        const user = await User.query().where('id',decoded.sub).select('username','id','name').first();
      
        const body = request.body();
        request.updateBody({
          ...body,
          user   
        })
     } catch (error) {
        console.log(error.message);
        return response.status(403).send({
          message: error.message,
        });
     }
     
    await next()
  }
}
