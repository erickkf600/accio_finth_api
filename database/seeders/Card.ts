import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Card from 'App/Models/Card'

export default class CardSeeder extends BaseSeeder {
  public async run () {
    await Card.createMany([
      { inicial_num: '5162', name: 'nubank', flag: 'mastercard', type: 'CRED' },
      { inicial_num: '5350', name: 'will bank', flag: 'mastercard', type: 'CRED'  },
    ])
  }
}
