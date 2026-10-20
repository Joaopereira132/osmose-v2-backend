const { safeParse } = require('valibot');

const validateSchema = (schema) => {
  return (req, res, next) => {
    const result = safeParse(schema, req.body);

    if (!result.success) {
      const errorMessages = result.issues.map((issue) => issue.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errorMessages
      });
    }

    next();
  };
};

module.exports = { validateSchema };
