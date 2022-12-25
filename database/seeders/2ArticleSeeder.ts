import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Article from 'App/Models/Article'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    const user = await User.query().limit(1)
    
    const data = [
        {
          title: 'Post 1',
          description: 'Description 1',
          body: 'Body Post 1',
          published: true,
          user_id: user[0].id,
        },
        {
          title: 'Post 2',
          description: 'Description 2',
          body: 'Body Post 2',
          published: false,
          user_id: user[0].id,
        }
    ]
    await Article.createMany(data)
  }
}
