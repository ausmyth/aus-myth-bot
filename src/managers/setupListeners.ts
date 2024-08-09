import { Client } from "discord.js";
import { CommandManager } from "./CommandManager";
import { MessageHandler } from "./MessageHandler";
import { GuildMemberUpdateHandlerManager } from "./GuildMemberUpdateHandler";

export function setupListeners(
  client: Client,
  commandManager: CommandManager,
  messageHandler: MessageHandler,
  guildMemberUpdateHandler: GuildMemberUpdateHandlerManager
) {
  client.on("ready", async () => {
    console.log(`Logged in as ${client.user?.tag}!`);
    await commandManager.registerCommands(client);
  });

  client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
      await commandManager.handleInteraction(client, interaction);
    }
  });

  client.on("messageCreate", async (message) => {
    await messageHandler.handleMessage(message);
  });

  client.on("guildMemberUpdate", async (oldMember, newMember) => {
    await guildMemberUpdateHandler.handleGuildMemberUpdate(
      oldMember,
      newMember
    );
  });
}
