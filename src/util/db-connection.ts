import { Pool } from 'pg';

export const connectionPool = new Pool({
  user: process.env.aws_db_user,
  host: process.env.aws_db_host,
  database: process.env.aws_db_name,
  password: process.env.aws_db_password,
  port: 5432,
  max: 5,

  // For heroku connection
  connectionString: process.env.DATABASE_URL,
});