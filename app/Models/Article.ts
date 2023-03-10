import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Article extends BaseModel {
  public static table = 'articles'

  @column({ isPrimary: true })
  public id: number

  @column()
  public title:string

  @column()
  public description:string

  @column()
  public body:string

  @column()
  public published: boolean

  @column()
  public user_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
