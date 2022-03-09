/**
 /**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable("users", table => {
        table
            .increments("user_id")
            .unsigned()
            .primary()
        table.string("name").notNullable()
        table.string("password").notNullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.dropTable("users")
};
