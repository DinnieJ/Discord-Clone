import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import JWTHandler from 'App/Utils/JWTHandler'
import ResponseHandler from 'App/Utils/ResponseHandler'

export default class UsersController {
  public async postLogin({ request, response }: HttpContextContract) {
    const data = request.only(['username', 'password'])
    let user: any = null
    try {
      user = await User.findBy('username', data.username)

      if (!user) {
        throw new Error('Username not found')
      }
      let verify = await Hash.verify(user.password, data.password)
      if (!verify) {
        throw new Error('Wrong credential, please try again')
      }

      const token = JWTHandler.signToken(user)

      ResponseHandler.sendResponse(response, {
        token,
        user: {
          username: user.username,
          name: user.name,
          config: user.config,
        },
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
      await newUser.save()
      ResponseHandler.sendResponse(response, {})
    } catch (error) {
      ResponseHandler.sendError(response, error.message)
    }
  }

  public async fetchUser({request, response}: HttpContextContract) {
    const user = await JWTHandler.authUser(JWTHandler.getHeaderToken(request))
    
    ResponseHandler.sendResponse(response, { user })
  }
}
