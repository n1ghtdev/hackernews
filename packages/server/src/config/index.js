import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (!envFound) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.REFRESH_JWT_SECRET,
  db: process.env.DATABASE,
};
