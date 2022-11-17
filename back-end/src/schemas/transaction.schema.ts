import Joi from 'joi';

export const TransferTransactionSchema = Joi.object({
  username: Joi.string().min(3).required(),
  value: Joi.number().min(0.1).required(),
});
