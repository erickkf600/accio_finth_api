import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Payments extends BaseSchema {
  protected tableName = 'payments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.decimal('payed_value', 15, 3).notNullable()
      table.integer('buy_id').nullable().unsigned().references('buys.id').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer("user_id", 11).unsigned().notNullable().references('users.id').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer("mounth_ref", 11).unsigned().nullable().references('mounths.id').onDelete('CASCADE').onUpdate('CASCADE')

      table.timestamp('created_at', { useTz: true }).nullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable()
      table.collate('utf8_unicode_ci')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
