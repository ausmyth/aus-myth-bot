import {
  CommandInteraction,
  Client,
  ApplicationCommandOptionType,
} from "discord.js";
import { Command } from "../Command";

const MAX_SIDES = 1000; // Hardcoded maximum number of sides
const DEFAULT_SIDES = 6; // Default number of sides if not specified

export const DiceRoll: Command = {
  name: "diceroll",
  description:
    "Rolls a dice with a specified number of sides, if not given assumes 6.",
  type: 1,
  options: [
    {
      name: "sides",
      description: "Number of sides on the dice (default: 6)",
      type: ApplicationCommandOptionType.Integer,
      required: false,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    if (!interaction.isChatInputCommand()) return;

    const sides = interaction.options.getInteger("sides") ?? DEFAULT_SIDES;

    if (sides < 2) {
      await interaction.followUp(
        "Please provide a valid number of sides (at least 2)."
      );
      return;
    }

    if (sides > MAX_SIDES) {
      await interaction.followUp(
        `The number of sides cannot exceed ${MAX_SIDES}.`
      );
      return;
    }

    const result = Math.floor(Math.random() * sides) + 1;
    await interaction.followUp(`You rolled a ${result}!`);
  },
};
