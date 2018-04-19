
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('letters', function(table) {
      table.increments('id').primary();
      table.text('content');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('letters'),
  ]);
};
