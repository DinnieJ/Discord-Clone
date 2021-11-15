import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import DirectMessageSession from './DirectMessageSession'
import User from './User'
import { uuid } from 'uuidv4'

export default class DirectMessage extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column({ columnName: 'dm_session_id' })
  public sessionId: string

  @column({ columnName: 'from_user_id' })
  public fromUserId: string

  @column()
  public content: string

  @column.date({ autoCreate: true, columnName: 'create_date' })
  public createdDate: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => DirectMessageSession, { foreignKey: 'dm_session_id' })
  public dmSession: BelongsTo<typeof DirectMessageSession>

  @belongsTo(() => User, { foreignKey: 'from_user_id' })
  public user: BelongsTo<typeof User>

  @beforeCreate()
  public static updateUUID(dm: DirectMessage) {
    dm.id = uuid()
  }
}
