import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

export default class UsersRepository {

  public static async getUserByUsername(username: string): Promise<any> {
    try {
      const query = await User.query()
        .preload('dmSessions', q => {
            q.preload('userTwoData')
        })
        .preload('dmSessions2', q => {
            q.preload('userOneData')
        })
        .where('username', username)
        .first()

      if (!query) {
        return null
      } else {
        let user: any = query.toJSON()

        return user
      }
    } catch (e) {
        console.log(e)
      return null
    }
  }
}
