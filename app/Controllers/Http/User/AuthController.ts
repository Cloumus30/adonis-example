// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
    public async viewAll(request){
        const reque = request
        console.log(reque);
        return {
            from:'auth',
            data: reque,
        }
    }
}
