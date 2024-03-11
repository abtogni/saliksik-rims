import crypto from "crypto";
import { config } from "dotenv";

config();

const SECRET = process.env.JWT_SECRET;

export const random = () => crypto.randomBytes(128).toString("base64");
export const authentication = (salt: string, password: string) => {
  const utf8Salt = Buffer.from(salt, 'utf-8').toString('base64');
  const utf8Password = Buffer.from(password, 'utf-8').toString('base64');

  return crypto
    .createHmac("sha256", [utf8Salt, utf8Password].join("/"))
    .update(Buffer.from(SECRET, 'utf-8'))
    .digest("hex");
};

