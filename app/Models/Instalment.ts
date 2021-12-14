import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Mounth from './Mounth'

export default class Instalment extends BaseModel {
  @column({ isPrimary: true,  serializeAs: null })
  public id: number

  @column()
  public instalment_num: number

  @column()
  public total_instalments: number

  @column()
  public instalment_value: number

  @column()
  public buy_id: number

  @column()
  public mounth_ref: number

  @column()
  public user_id: number

  @column()
  public year: number

 @column.dateTime({ autoCreate: true })
  public 	created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @hasOne(() => Mounth, {
    localKey: 'mounth_ref',
    foreignKey: 'id',
  })
  public month: HasOne<typeof Mounth>
}
