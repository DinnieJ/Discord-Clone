import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import { uuid } from 'uuidv4'
import DirectMessageSession from './DirectMessageSession'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column({ columnName: 'username' })
  public username: string

  @column({ columnName: 'password' })
  public password: string

  @column({ columnName: 'name' })
  public name: string

  @column({ columnName: 'config' })
  public config: Object

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async hashingData(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }

    user.id = uuid()
  }

  @hasMany(() => DirectMessageSession, {foreignKey: 'userOne', serializeAs: 'dms1'})
  public dmSessions: HasMany<typeof DirectMessageSession>

  @hasMany(() => DirectMessageSession, {foreignKey: 'userTwo', serializeAs: 'dms2'})
  public dmSessions2: HasMany<typeof DirectMessageSession>

}
