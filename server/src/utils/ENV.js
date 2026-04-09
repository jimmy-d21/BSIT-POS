import "dotenv/config";

const ENV = {
  server: {
    port: process.env.PORT,
    host: process.env.HOST,
  },
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  jwt: process.env.JWT_SECRET,
};

export default ENV;
