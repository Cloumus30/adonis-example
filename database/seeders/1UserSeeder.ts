import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    const data = [
      {
        username: 'user1',
        password: await Hash.make('user1pass'),
        name: 'User 1'
      },
      {
        username: 'user2',
        password: await Hash.make('user2pass'),
        name: 'User 2'
      }
    ]

    User.createMany(data)
  }
}
