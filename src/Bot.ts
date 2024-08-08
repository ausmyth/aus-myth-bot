import { Client, IntentsBitField, GatewayIntentBits } from "discord.js";
import interactionCreate from "./listeners/interactionCreate";
// import ready from "./listeners/ready";
import { loadCommands } from "./utils/commandLoader";
import { CommandHandler } from "./commands/CommandHandler";
import { CONFIG } from "./config";
import messageCreate from "./listeners/messageCreate";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

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
console.log(`Loaded commands: ${commands.map((cmd) => cmd.name).join(", ")}`);
const commandHandler = new CommandHandler(commands);

client.on("ready", async () => {
  console.log(`Logged in as ${client.user?.tag}!`);
  const rest = new REST({ version: "9" }).setToken(
    CONFIG.discordToken as string
  );

  try {
    console.log("Registering commands...");

    const clientId = client.user!.id;

    await rest.put(
      Routes.applicationGuildCommands(clientId, CONFIG.guildId as string),
      {
        body: commands,
      }
    );

    console.log("Commands registered successfully.");
  } catch (error) {
    console.error("Error registering commands:", error);
  }

  client.application?.commands.set(commands);
});

interactionCreate(client, commandHandler);
messageCreate(client);

client.login(CONFIG.discordToken);
