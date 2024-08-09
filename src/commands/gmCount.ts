import { CommandInteraction, Client } from "discord.js";
import { Command } from "../types/Command";
import { persistentStore } from "../managers/PersistentStoreManager";

// todo: make this a counter for the month only?

export const GmCountCommand: Command = {
  name: "gmcount",
  description: 'Shows the number of times "gm" was counted',
  type: 1,

  run: async (client: Client, interaction: CommandInteraction) => {
    let count = persistentStore["gmCount"];
    await interaction.reply(`The "gm" count is: ${count}`);
  },
};
