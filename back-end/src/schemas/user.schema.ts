import Joi from 'joi';
import { messages } from '../utils/schema/messages';

export const UserRegisterSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required().messages({
    'string.pattern.base': messages.invalidPassword,
  }),
});
