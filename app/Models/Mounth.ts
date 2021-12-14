import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Mounth extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public title: string
  @column()
  public num: number
  @column()
  public full_name: string
}
