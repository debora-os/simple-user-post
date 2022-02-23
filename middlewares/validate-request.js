const yup = require("yup");

const validateRequest = (schemap) => {
  return async (req, res, next) => {
    const schema = yup.object(schemap).noUnknown(true).required();

    try {
      const values = await schema.validate(req.body, { abortEarly: false });

      req["body"] = values

      next();
    } catch (err) {
      res.status(400).send({ message: err.errors });
    }
  };
};

module.exports = validateRequest;
