import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Article from 'App/Models/Article'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    const data = [
        {
          title: 'Post 1',
          description: 'Description 1',
          body: 'Body Post 1',
          published: true,
        },
        {
          title: 'Post 2',
          description: 'Description 2',
          body: 'Body Post 2',
          published: false,
        }
    ]
    await Article.createMany(data)
  }
}
