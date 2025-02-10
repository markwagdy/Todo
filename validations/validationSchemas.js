const Joi = require('joi')


const createValidationSchema = Joi.object({
    task: Joi.string().trim().min(1).required().messages({
        'Task': 'Task can not be empty'
    }),
    userId:Joi.number().min(1).required().messages({
        'userId':'userId can not be empty' 
    })
})

const putValidationSchema = Joi.object({
    id: Joi.string().trim().min(1).required().messages({
        'id': 'id is required'
    })
})

const createUserValidationSchema = Joi.object({
    userName: Joi.string().trim().min(1).required().messages({
        'User Name': 'user name can not be empty'
    }),
    email: Joi.string().trim().min(1).required().messages({
        'Email': 'Email can not be empty'
    }),
    password: Joi.string().trim().min(1).required().messages({
        'Password': 'Password can not be empty'
    })
});

module.exports = { createValidationSchema, putValidationSchema, createUserValidationSchema }
