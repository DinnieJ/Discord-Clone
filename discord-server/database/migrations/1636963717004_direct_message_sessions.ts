import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DirectMessageSessions extends BaseSchema {
  protected tableName = 'direct_message_sessions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('user_one').notNullable()
      table.uuid('user_two').notNullable()
      table.integer('status').defaultTo(1).notNullable()

      table.foreign('user_one').references('users.id').onDelete('CASCADE')
      table.foreign('user_two').references('users.id').onDelete('CASCADE')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
