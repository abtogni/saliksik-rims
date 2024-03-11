import bcrypt from "bcrypt";
import { config } from "dotenv";

config();

const SALT_ROUNDS = 10;

export const random = () => bcrypt.genSaltSync(SALT_ROUNDS);
export const authentication = (password: string, salt: string) => bcrypt.hashSync(password, `$2a$${SALT_ROUNDS}$${salt}`);
