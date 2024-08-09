import { Client, IntentsBitField, GatewayIntentBits } from "discord.js";
import { CONFIG } from "./utils/config";
import { CommandManager } from "./managers/CommandManager";
import { MessageHandler } from "./managers/MessageHandler";
import { GuildMemberUpdateHandlerManager } from "./managers/GuildMemberUpdateHandler";
import { setupListeners } from "./managers/setupListeners";
import Database from "./db/database";

async function startBot() {
  console.log("Bot is starting...");

  try {
    await Database.initialize();

    const client = new Client({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        IntentsBitField.Flags.GuildMembers,
      ],
    });

    const commandManager = new CommandManager();
    const messageHandler = new MessageHandler();
    const memberUpdateHandler = new GuildMemberUpdateHandlerManager();

    setupListeners(client, commandManager, messageHandler, memberUpdateHandler);

    await client.login(CONFIG.discordToken);
  } catch (error) {
    console.error("Failed to start the bot:", error);
  }
}

startBot();
