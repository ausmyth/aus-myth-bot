import { Client, ClientOptions, IntentsBitField, GatewayIntentBits } from "discord.js";
import interactionCreate from "./listeners/interactionCreate";
import ready from "./listeners/ready";

// Grab the secrets
import dotenv from "dotenv"
dotenv.config();

const token = process.env.DISCORD_TOKEN

console.log("Bot is starting...");

const client = new Client({
    // intents: []
    // intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        IntentsBitField.Flags.GuildMembers
    ]
});

ready(client);
interactionCreate(client);

client.login(token);