import { CommandInteraction, Client } from "discord.js";
import { Command } from "./Command";
import { cache } from "../utils/cacheManager";

export class GmCountCommand implements Command {
  name = "gmcount";
  description = 'Shows the number of times "gm" was counted';

  async run(client: Client, interaction: CommandInteraction) {
    const count = cache.get<number>("gmCount") || 0;
    await interaction.reply(`The "gm" count is: ${count}`);
  }
}
