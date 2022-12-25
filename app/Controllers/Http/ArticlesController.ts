// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Article from "App/Models/Article"

export default class ArticlesController {

    public async viewAll({response, request}){
        const page = request.qs().page || 1;
        const data = await Article.query().paginate(page)

        return response.status(200).send({
            data
        }) 
    }
}
