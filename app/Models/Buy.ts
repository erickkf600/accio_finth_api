import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Card from './Card'
import Instalment from './Instalment'
import User from './User'

export default class Buy extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public buy_name: string

  @column()
  public user_id: number

  @column()
  public card_id: number

  @column()
  public 	obs?: string

  @column()
  public 	total?: number

  @column()
  public 	payed?: number

  @column.dateTime({ autoCreate: true })
  public 	created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @hasOne(() => Card, {
    localKey: 'card_id',
    foreignKey: 'id',
  })
  public card: HasOne<typeof Card>

  @hasOne(() => User, {
    localKey: 'user_id',
    foreignKey: 'id',
  })
  public user: HasOne<typeof User>

  @hasMany(() => Instalment, {
    foreignKey: 'buy_id',
  })
  public instalments: HasMany<typeof Instalment>

  @hasMany(() => Instalment, {
    localKey: 'user_id',
    foreignKey: 'user_id',
  })
  public instalmentsUser: HasMany<typeof Instalment>
}
