import Database from '@ioc:Adonis/Lucid/Database'
import DirectMessageSession from 'App/Models/DirectMessageSession'

export default class DirectMessaagesRepository {
  public static async create(
    userOne: string,
    userTwo: string
  ): Promise<DirectMessageSession | null> {
    try {
      Database.beginGlobalTransaction()
      const newSession = await DirectMessageSession.create({
        userOne,
        userTwo,
      })

      Database.commitGlobalTransaction()
      return newSession
    } catch (e) {
      Database.rollbackGlobalTransaction()
      return null
    }
  }

  public static async findDirectMessageSession(firstUserId: string, secondUserId: string) {
    try {
      const dms = await DirectMessageSession.query().preload('directMessages', (qdm) => {
        qdm
          .where(
            'create_date',
            DirectMessageSession.query()
              .select('create_date')
              .groupBy('create_date')
              .limit(3)
              .orderBy('create_date', 'desc')
          )
      }).where(wq => {
          wq.where('user_one', firstUserId).where('user_two', secondUserId)
      }).orWhere(wq => {
          wq.where('user_two', firstUserId).where('user_one', secondUserId)
      }).first()

      return dms
    } catch (e) {
        console.log(e)
        return null
    }
  }
}
