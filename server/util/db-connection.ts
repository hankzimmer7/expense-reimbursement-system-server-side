import { Pool } from 'pg';

export const connectionPool = new Pool({
  user: process.env.AWS_DB_USER,
  host: process.env.AWS_DB_HOST,
  database: process.env.AWS_DB_NAME,
  password: process.env.AWS_DB_PASSWORD,
  port: 5432,
  max: 5,

  // For Heroku connection
  connectionString: process.env.DATABASE_URL,
});