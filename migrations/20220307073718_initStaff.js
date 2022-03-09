/**
 /**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable("staff", table => {
        table
            .increments("staff_id")
            .unsigned()
            .primary()
        table
            .date("birth_date")
            .notNullable()
        table.string("first_name").notNullable()
        table.string("last_name").notNullable()
        table.enum('position', ['Junior Software Engineer', 'Software Engineer', 'Senior Software Engineer', 'Lead Software Engineer']).notNullable()
        table.float("salary").notNullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.dropTable("staff")
};
