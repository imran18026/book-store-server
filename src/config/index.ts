import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT || 5000,
  dbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtSecretExpiresIn: process.env.JWT_SECRET_EXPIRES_IN,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  refreshTokenSecretExpiresIn: process.env.REFRESH_TOKEN_SECRET_EXPIRES_IN,
  saltRounds: process.env.SALT_ROUNDS,
};
