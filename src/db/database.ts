import { Client } from "pg";
import { CONFIG } from "../utils/config";

class Database {
  private static instance: Client | null = null;

  private constructor() {}

  public static async initialize(): Promise<void> {
    if (!Database.instance) {
      Database.instance = new Client({
        host: CONFIG.dbHost,
        user: CONFIG.dbUser,
        password: CONFIG.dbPass,
        database: CONFIG.dbName,
      });

      try {
        await Database.instance.connect();
        console.log("Connected to database");
      } catch (err) {
        console.error("Connection error", err);
        throw err;
      }
    }
  }

  public static get client(): Client {
    if (!Database.instance) {
      throw new Error(
        "Database not initialized. Call Database.initialize() first."
      );
    }
    return Database.instance;
  }
}

export default Database;

/* How to use the db client in other files:
import Database from "../db/database";

async function someFunction() {
  const dbClient = Database.client;
  // Use dbClient for database operations
  const result = await dbClient.query("SELECT * FROM some_table");
  // ... do something with the result
}
*/
