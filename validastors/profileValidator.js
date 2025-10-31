import Joi from "joi";

export const profileSchema = Joi.object({
  firstname: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.base": "First name must be a string",
      "string.empty": "First name is required",
      "string.min": "First name must have at least 2 characters",
      "string.max": "First name cannot exceed 50 characters",
      "any.required": "First name is required",
    }),

  lastname: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.base": "Last name must be a string",
      "string.empty": "Last name is required",
      "string.min": "Last name must have at least 2 characters",
      "string.max": "Last name cannot exceed 50 characters",
      "any.required": "Last name is required",
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.base": "Email must be a string",
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),

  contactno: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Contact number must be 10 digits",
      "string.empty": "Contact number is required",
      "any.required": "Contact number is required",
    }),
});

export const signupSchema = Joi.object({
  firstname: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.min": "First name must have at least 2 characters",
      "string.max": "First name cannot exceed 50 characters",
      "any.required": "First name is required",
    }),

  lastname: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.min": "Last name must have at least 2 characters",
      "string.max": "Last name cannot exceed 50 characters",
      "any.required": "Last name is required",
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),

  contactno: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Contact number must be exactly 10 digits",
      "any.required": "Contact number is required",
    }),

  password: Joi.string()
    .min(8)
    .max(12)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password cannot exceed 12 characters",
      "any.required": "Password is required",
    }),
});

export const addressSchema = Joi.object({
  street: Joi.string()
    .max(100)
    .allow("")
    .messages({
      "string.max": "Street name cannot exceed 100 characters",
    }),

  city: Joi.string()
    .max(50)
    .allow("")
    .messages({
      "string.max": "City name cannot exceed 50 characters",
    }),

  state: Joi.string()
    .max(50)
    .allow("")
    .messages({
      "string.max": "State name cannot exceed 50 characters",
    }),

  pinCode: Joi.string()
    .pattern(/^[0-9]{6}$/)
    .allow("")
    .messages({
      "string.pattern.base": "Pin code must be exactly 6 digits",
    }),
});
