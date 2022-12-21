// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Article from "App/Models/Article"

export default class ArticlesController {

    public async viewAll({response}){
        const data = await Article.all()

        return response.status(200).send({
            data
        }) 
    }
}
