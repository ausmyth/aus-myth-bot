import { Client, IntentsBitField, GatewayIntentBits } from "discord.js";
import interactionCreate from "./listeners/interactionCreate";
// import ready from "./listeners/ready";
import { loadCommands } from "./utils/commandLoader";
import { CommandHandler } from "./commands/CommandHandler";
import { CONFIG } from "./config";
import messageCreate from "./listeners/messageCreate";

console.log("Bot is starting...");

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

const commands = loadCommands();
const commandHandler = new CommandHandler(commands);

// ready(client);

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
  client.application?.commands.set(commands);
});

interactionCreate(client, commandHandler);
messageCreate(client);

client.login(CONFIG.discordToken);
