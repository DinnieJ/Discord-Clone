import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import DirectMessageSession from 'App/Models/DirectMessageSession'
import JWTHandler from 'App/Utils/JWTHandler'

export default class DirectMessagesController {
    public async postDirectMessage({ request }: HttpContextContract ) {
        const data = request.only(['to_id', 'content'])
        const user: any = await JWTHandler.authUser(request)
        const dms = DirectMessageSession.query().where(q => {
            q.where('user_one', user.id).where('user_two', data.to_id)
        }).orWhere(q => {
            q.where('user_two', user.id).where('user_two', data.to_id)
        }).first()
    }

    public async getDirectMessageData({ request }: HttpContextContract) {
        
    }
}
