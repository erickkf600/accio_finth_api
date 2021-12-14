import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Buy from './Buy'

export default class Card extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public inicial_num: string

  @column()
  public name: string

  @column()
  public flag: string

  @column()
  public type: string

  @column.dateTime({ autoCreate: true })
  public 	created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @belongsTo(() => Buy)
  public card: BelongsTo<typeof Buy>
}
