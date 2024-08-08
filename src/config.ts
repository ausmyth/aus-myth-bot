import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

// todo: remove duplicate code
// todo: panic on not finding env vars
export const CONFIG = {
  discordToken: process.env.DISCORD_TOKEN,
  guildId: process.env.GUILD_ID,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  dbName: process.env.DB_NAME,
};

// Create and export a configured database client
export const dbClient = new Client({
  host: CONFIG.dbHost,
  user: CONFIG.dbUser,
  password: CONFIG.dbPass,
  database: CONFIG.dbName,
});

dbClient
  .connect()
  .then(() => console.log("Connected to database"))
  .catch((err: { stack: any }) => console.error("Connection error", err.stack));
