const Joi = require("joi");

async function vaidasync(data, schema, res, next) {
  try {
    await schema.validateAsync({ ...data });
    next();
  } catch (error) {
    res.send({ status: false, message: error.details[0].message });
    return false;
  }
}

module.exports.schemaAuthValidate = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  });
  vaidasync(req.body, schema, res, next);
};
