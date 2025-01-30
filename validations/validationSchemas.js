const Joi = require('joi')


const createValidationSchema = Joi.object({
    task: Joi.string().trim().min(1).required().messages({
        'Task': 'Task can not be empty'
    })
})

const putValidationSchema = Joi.object({
    id: Joi.string().trim().min(1).required().messages({
        'id': 'id is required'
    })
})


module.exports = { createValidationSchema, putValidationSchema }
