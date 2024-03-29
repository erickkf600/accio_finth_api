import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    await User.createMany([
      { name: 'Erick Ferreira', user: 'erickkf600', email: 'erickkf600@gmail.com', password:'82944452' },
      { name: 'Thaisa Ferreira', user: 'thaisaaf', email: 'thaisaaf@gmail.com', password:'83683502' },
    ])
  }
}
