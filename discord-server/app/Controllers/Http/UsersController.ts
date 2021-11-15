import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import JWTHandler from 'App/Utils/JWTHandler'
import ResponseHandler from 'App/Utils/ResponseHandler'
import Redis from '@ioc:Adonis/Addons/Redis'
import UsersRepository from 'App/Repositories/UsersRepository'
import Database from '@ioc:Adonis/Lucid/Database'
import UserMetadataResponse from 'App/Responses/UserMetadata'

export default class UsersController {
  public async postLogin({ request, response }: HttpContextContract) {
    const data = request.only(['username', 'password'])
    try {
      const userData = await UsersRepository.getUserByUsername(data.username)
      if (!userData) {
        throw new Error('Username not found')
      } else {
        let verify = await Hash.verify(userData.password, data.password)
        if (!verify) {
          throw new Error('Wrong credential, please try again')
        }
      }
      const token = JWTHandler.signToken(userData)
      ResponseHandler.sendResponse(response, {
        token,
        user: new UserMetadataResponse(userData),
      })
    } catch (e) {
      ResponseHandler.sendError(response, e.message)
    }
  }

  public async postRegister({ request, response }: HttpContextContract) {
    await request.validate(RegisterUserValidator)
    const data = request.only(['username', 'password', 'name'])
    const newUser = new User()

    Object.keys(data).forEach((key) => (newUser[key] = data[key]))

    try {
      Database.beginGlobalTransaction()
      await newUser.save()
      Database.commitGlobalTransaction()
      ResponseHandler.sendResponse(response, {})
    } catch (error) {
      Database.rollbackGlobalTransaction()
      ResponseHandler.sendError(response, error.message)
    }
  }

  public async postLogout({ request, response }: HttpContextContract) {
    const user: any = await JWTHandler.authUser(request)
    await Redis.hdel('onlineUsers', user.id)

    ResponseHandler.sendResponse(response, {})
  }

  public async fetchUser({ request, response }: HttpContextContract) {
    const user: any = await JWTHandler.authUser(request)
    if (user) {
      ResponseHandler.sendResponse(response, { user })
    } else ResponseHandler.sendError(response, 'Unable to fetch user')
  }
}
