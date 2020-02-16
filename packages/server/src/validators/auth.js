import Joi from '@hapi/joi';

export function signUpValidation(data) {
  const schema = Joi.object({
    name: Joi.string()
      .min(4)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required(),
  });

  return schema.validate(data);
}

export function signInValidation(data) {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required(),
  });

  return schema.validate(data);
}
