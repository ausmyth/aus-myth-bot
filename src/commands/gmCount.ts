import { CommandInteraction, Client } from "discord.js";
import { Command } from "./Command";
import { cache } from "../utils/cacheManager";

export const GmCountCommand: Command = {
  name: "gmcount",
  description: 'Shows the number of times "gm" was counted',
  type: 1,

  run: async (client: Client, interaction: CommandInteraction) => {
    const count = cache.get<number>("gmCount") || 0;
    await interaction.reply(`The "gm" count is: ${count}`);
  },
};
