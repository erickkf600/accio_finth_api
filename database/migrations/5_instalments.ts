import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Instalments extends BaseSchema {
  protected tableName = 'instalments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('instalment_num').nullable()
      table.integer('total_instalments').nullable()
      table.decimal('instalment_value', 15, 3).nullable()
      table.integer('buy_id').nullable().unsigned().references('buys.id').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer("user_id", 11).unsigned().notNullable().references('users.id').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer("mounth_ref", 3).unsigned().nullable().references('mounths.id').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer("year", 4).nullable()
      table.timestamp('created_at', { useTz: true }).nullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable()
      table.collate('utf8_unicode_ci')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
