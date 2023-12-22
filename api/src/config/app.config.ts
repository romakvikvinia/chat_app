export const configuration = () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  database: {
    host: process.env.DATABASE_HOST,
    name: process.env.DATABASE_NAME,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRE_IN,
  },
});
