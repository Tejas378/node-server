import Joi from "joi";

export const profileSchema = Joi.object({
    firstname: Joi.string().min(2).max(50).required(),
    lastname: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    contactno: Joi.string().pattern(/^[0-9]{10}$/).required(),
});
export const signupSchema = Joi.object({
    firstname: Joi.string().min(2).max(50).required(),
    lastname: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    contactno: Joi.string().pattern(/^[0-9]{10}$/).required(),
    password: Joi.string().min(8).max(12).required(),
});

export const addressSchema = Joi.object({
    street: Joi.string().max(100).allow(""),
    city: Joi.string().max(50).allow(""),
    state: Joi.string().max(50).allow(""),
    pinCode: Joi.string().pattern(/^[0-9]{6}$/).allow(""),
});
