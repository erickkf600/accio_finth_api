import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Movements extends BaseSchema {
  protected tableName = 'movements'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string("cod", 20).notNullable()
      table.string("date_operation", 11).notNullable()
      table.integer("qtd", 11).notNullable()
      table.integer("type", 5).unsigned().nullable().references('types.id').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer("type_operation", 5).unsigned().nullable().references('operations.id').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer("month_ref", 3).unsigned().nullable().references('mounths.id').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer("year", 4).nullable()
      table.decimal('unity_value', 15, 2).nullable()
      table.text("obs").nullable()
      table.decimal('fee', 15, 2).nullable()
      table.decimal('total', 15, 2).nullable()
      table.timestamp('created_at', { useTz: true }).nullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable()
      table.collate('utf8_unicode_ci')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
