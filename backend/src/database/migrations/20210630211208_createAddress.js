
exports.up = function(knex) {
    return knex.schema.createTable('address',function(table){
      table.string('id').primary();
      table.string('street').notNullable();
      table.string('district').notNullable();
      table.string('number').notNullable();
      table.string('user_id').notNullable();
      table.foreign('user_id').references('id').inTable('users').onDelete('SET NULL');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('address');
};
