import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DirectMessages extends BaseSchema {
  protected tableName = 'direct_messages'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('dm_session_id').notNullable()
      table.uuid('from_user_id').notNullable()
      table.string('content', 128).notNullable()
      table.date('create_date')

      table.index(['dm_session_id'])
      table.foreign('dm_session_id').references('direct_message_sessions.id').onDelete('CASCADE')
      table.foreign('from_user_id').references('users.id').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
