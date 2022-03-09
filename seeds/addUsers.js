

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const faker = require("faker");
const bcrypt = require('bcrypt');


const createFakerUser = () => ({
  name: faker.internet.userName(),
  password: bcrypt.hashSync('admin123',8)
})

exports.seed = async function (knex) {
  const fakeStaff = []
  const desiredFakeUsers = 5;
  for (let i = 0; i < desiredFakeUsers; i++) {
    fakeStaff.push(createFakerUser())
  }
  await knex("users")
      .insert(fakeStaff)
};

