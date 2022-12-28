// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Article from "App/Models/Article"

export default class ArticlesController {

    public async viewAll({response, request}){
        const user = request.body().user;
        const page = request.qs().page || 1;
        const data = await Article.query().where('user_id',user.id).paginate(page)

        return response.status(200).send({
            data
        }) 
    }
}
