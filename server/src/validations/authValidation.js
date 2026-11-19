const Joi = require('joi');

// Define the validation rules
const registerSchema = Joi.object({
  firstName: Joi.string().trim().min(3).max(30).required(),
  lastName: Joi.string().trim().min(3).max(30).required(),
  email: Joi.string().trim().email({ minDomainSegments: 2}).required(),
  image: Joi.string().allow('', null), // Optional field
  password: Joi.string().min(8).max(60).pattern(/^[a-zA-Z0-9!@#$%^&*]+$/).required()
});

const loginSchema = Joi.object({
  email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required()
});


module.exports = { registerSchema, loginSchema };
