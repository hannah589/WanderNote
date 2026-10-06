const Joi = require('joi');

// Define the validation rules
const userSignUpSchema = Joi.object({
  firstName: Joi.string().required().messages({
    // 'string.empty' = key exists but user has returned an empty string 
    'string.empty': 'First name is required.',
    // 'any.required' = key doesn't exist. Nothing gets returned
    'any.required': 'First name is required.'
    // *Keep the msg the same. It sends back the same msg to the user UI
  }),
  lastName: Joi.string().required().messages({
    'string.empty': 'Last name is required.',
    'any.required': 'Last name is required.'
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email address is required.',
    'string.email': 'Please enter a valid email address.',
    'any.required': 'Email address is required.'
  }),
  image: Joi.string().allow('', null), // Optional field
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required.',
    'string.min': 'Password must be at least 6 characters long.',
    'any.required': 'Password is required.'
  })
});

// Middleware function to intercept the request
const validateUserSignUp = (req, res, next) => {
  const { error } = userSignUpSchema.validate(req.body, { abortEarly: true }); // abortEarly: true returns the first error found

  if (error) {
    // Send back the custom message we defined above
    return res.status(400).json({ message: error.details[0].message });
  }

  next(); //move on to the next middleware or controller
};


module.exports = { validateUserSignUp };
