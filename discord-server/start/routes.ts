/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/v1/test', async () => {
  return { hello: 'noob2' }
})

Route.group(() => {
  Route.group(() => {
    Route.post('login', 'UsersController.postLogin')
    Route.post('register', 'UsersController.postRegister')
    Route.get('user', 'UsersController.fetchUser').middleware(['jwtauth'])
  }).prefix('auth')
}).prefix('v1')
