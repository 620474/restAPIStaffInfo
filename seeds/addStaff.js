



/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const faker = require("faker");
const bcrypt = require('bcrypt');

function positionUser() {
  let positionEnum = ['Junior Software Engineer', 'Software Engineer', 'Senior Software Engineer', 'Lead Software Engineer']
  return positionEnum[Math.floor(Math.random() * positionEnum.length)]
}


const createFakerUser = () => ({
  birth_date: faker.date.past(),
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  position: positionUser(),
  salary: 10000
})

exports.seed = async function (knex) {
  const fakeStaff = []
  const desiredFakeUsers = 1;
  for (let i = 0; i < desiredFakeUsers; i++) {
    fakeStaff.push(createFakerUser())
  }
  await knex("staff")
      .insert(fakeStaff)
};

