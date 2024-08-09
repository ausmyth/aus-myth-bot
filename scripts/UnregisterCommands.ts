import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

dotenv.config(); // This always assumes this is not being run from inside a container

const token = process.env["DISCORD_TOKEN"] || ""; // Should fail on connect if not set
const guildId = process.env["GUILD_ID"] || "";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", async () => {
  try {
    console.log("Logged in as", client.user?.tag);

    // Get the guild
    const guild = client.guilds.cache.get(guildId);
    if (!guild) {
      console.error("Guild not found");
      return;
    }

    // Fetch and delete all global commands
    const commands = await guild.commands.fetch();
    for (const command of commands.values()) {
      await command.delete();
      console.log(`Deleted command: ${command.name}`);
    }

    console.log("All commands have been deleted.");
  } catch (error) {
    console.error("Error deleting commands:", error);
  } finally {
    client.destroy();
  }
});

client.login(token);
