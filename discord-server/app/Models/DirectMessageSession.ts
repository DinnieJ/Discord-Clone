import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  beforeCreate,
  belongsTo,
  BelongsTo,
} from '@ioc:Adonis/Lucid/Orm'
import DirectMessage from './DirectMessage'
import { uuid } from 'uuidv4'
import User from './User'

export default class DirectMessageSession extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column({ columnName: 'user_one' })
  public userOne: string

  @column({ columnName: 'user_two' })
  public userTwo: string

  @column()
  public status: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, { localKey: 'id', foreignKey: 'userOne' })
  public userOneData: BelongsTo<typeof User>

  @belongsTo(() => User, { localKey: 'id', foreignKey: 'userTwo' })
  public userTwoData: BelongsTo<typeof User>

  @hasMany(() => DirectMessage, { localKey: 'id', foreignKey: 'sessionId' })
  public directMessages: HasMany<typeof DirectMessage>

  @beforeCreate()
  public static updateUUID(dms: DirectMessageSession) {
    dms.id = uuid()
  }
}
