import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Buys extends BaseSchema {
  protected tableName = 'buys'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("buy_name", 50).notNullable()
      table.integer("user_id", 11).unsigned().notNullable().references('users.id').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer("card_id", 11).unsigned().notNullable().references('cards.id').onDelete('CASCADE').onUpdate('CASCADE')
      table.text("obs").nullable()
      table.timestamp('created_at', { useTz: true }).nullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable()
      table.collate('utf8_unicode_ci')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
