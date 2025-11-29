import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  private static instance: mysql.Pool;

  private constructor() {}

  public static getInstance() {

    if (!Database.instance) {
      Database.instance = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT) || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
    }

    return Database.instance;
  }
}

export const pool = Database.getInstance();
