import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User'
import { RequestContract } from '@ioc:Adonis/Core/Request'

export default class JWTHandler {
  public static signToken(user): string {
    const token = jwt.sign({ id: user.id }, Env.get('JWT_SECRET') ?? 'secret')

    return token
  }

  public static async authUser(request: RequestContract): Promise<User|null> {
    try {
      const token = this.getHeaderToken(request) ?? ''
      const decoded = jwt.verify(token, Env.get('JWT_SECRET') ?? 'secret')
      const user = User.query().where('id', decoded['id']).select('id','username', 'name', 'config').first()
      return user
    } catch (e) {
      return null
    }
  }

  public static verifyToken(token: string): boolean {
    try {
      const decoded = jwt.verify(token, Env.get('JWT_SECRET') ?? 'secret')
      return true
    } catch (e) {
      return false
    }
  }

  public static getHeaderToken(request: RequestContract): string {
    return request.header('Authorization')?.trim().split(' ')[1] ?? ''
  }
}
