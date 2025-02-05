import 'dotenv/config'

import * as joi from 'joi'

/**
 * @interface EnvVars
 * @description Interface to define the environment variables.
 * PORT: The port number to run the server on.
 * JWT_SECRET: The secret key used to sign and verify JWT tokens.
 */

interface EnvVars {
  PORT: number;

  JWT_SECRET: string;
}

/** 
 * @constant envsSchema
 * @description Joi schema to validate the environment variables.
 */

const envsSchema = joi.object({
  PORT: joi.number().required(),
  JWT_SECRET: joi.string().required(),

})
.unknown(true)

const {error, value} = envsSchema.validate(
  process.env
)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}
const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  secret: envVars.JWT_SECRET
}