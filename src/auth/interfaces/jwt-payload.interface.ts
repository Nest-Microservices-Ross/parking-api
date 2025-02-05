/**
 * @interface JwtPayload
 * @description Interface to define the payload of the JWT token.
 * It contains the id, email, name and role of the user.
 */


export interface JwtPayload {
  id: number;
  email: string;
  name: string;
  role: string;
}