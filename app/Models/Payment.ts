import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Buy from './Buy'

export default class Payment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public payed_value: number

  @column()
  public buy_id: number

  @column()
  public user_id: number

  @column()
  public mounth_ref: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Buy)
  public card: BelongsTo<typeof Buy>
}
