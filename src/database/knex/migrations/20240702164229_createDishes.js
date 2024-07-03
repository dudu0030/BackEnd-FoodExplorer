exports.up = knex => knex.schema.createTable("dishes", table => {
    table.increments("id");
    table.text("name");
    table.text("description");
    table.real("price");
    table.varchar("image");
});

exports.down = knex => knex.schema.dropTable("dishes"); 