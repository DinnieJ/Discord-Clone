import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ErrorResponseReporter from 'App/Reporters/ErrorResponseReporter'

export default class RegisterUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    username: schema.string({ trim: true }, [
      rules.minLength(8),
      rules.maxLength(32),
      rules.required(),
      rules.unique({ table: 'users', column: 'username' }),
    ]),

    password: schema.string({}, [rules.minLength(8), rules.maxLength(32), rules.required()]),

    name: schema.string({ trim: true }, [
      rules.minLength(16),
      rules.maxLength(64),
      rules.required(),
      rules.alpha({ allow: ['space'] }),
    ]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {
    'username.required': 'Username is required',
    'username.minLength': 'Too short',
    'username.maxLength': 'Username is too long',
    'username.unique': 'Already exist username'
  }

  public reporter = ErrorResponseReporter
}
