export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expiration: process.env.JWT_EXPIRATION_TIME,
  database: {
    uri: process.env.DATABASE_URI,
  },
});
