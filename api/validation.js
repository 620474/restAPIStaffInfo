const {celebrate, Joi} = require('celebrate')


const usersValidator = celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        password: Joi.string().min(5).max(30).required()
    }),
});

const staffCreateValidator = celebrate({
    body: Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        birth_date: Joi.date().required(),
        position: Joi.string().required(),
        salary: Joi.number().required()
    }),
});


module.exports={
    usersValidator,
    staffCreateValidator,
}
