import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import JWTHandler from 'App/Utils/JWTHandler'
import ResponseHandler from 'App/Utils/ResponseHandler'

export default class JwtAuthentication {
  public async handle({request, response}: HttpContextContract, next: () => Promise<void>) {
    const token = JWTHandler.getHeaderToken(request)
    if(!token) {
      ResponseHandler.sendError(response, "No token found in request", "ERR_AUTHORIZATION", 401)
    } else {
      const verify = JWTHandler.verifyToken(token)
      if(verify) {
        await next()
      } else {
        ResponseHandler.sendError(response, "Invalid token", "ERR_AUTHORIZATION", 401)
      }
    }
  }
}
