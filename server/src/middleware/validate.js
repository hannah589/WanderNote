//Joi validation middleware function, to return errors for bad data that doesn't match the schema
function validate(schema) {
  // Return Express middleware that receives the request, response and next function
  return (req, res, next) => {
    // Validate the incoming request body against the Joi schema
    const { error, value } = schema.validate(req.body, {
      // Return all validation errors instead of stopping at the first
      abortEarly: false, 
      // Remove fields that are not defined in the schema
      stripUnknown: true, 
    });
    
    // If validation fails, return a 400 Bad Request response
    if(error) {
      return res.status(400).json({
        message: "Validation failed",

        // Extract each validation error message into an array
        errors: error.details.map((detail) => ({
          field: detail.path.join("."),
          message: detail.message
        })),
      });
    }

    // Replace the request body with Joi's validated and cleaned data
    req.body = value;

    // Continue to the next middleware or controller
    next();
  };
}

module.exports = validate;

/* Will show in terminal/console:
  {
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "\"email\" must be a valid email"
    },
    {
      "field": "password",
      "message": "Password must be at least 8 characters long"
    }
  ]
}
*/