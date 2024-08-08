import { CommandInteraction, Client, Interaction } from "discord.js";
import { Commands } from "../Commands";

export default (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
      await handleSlashCommand(client, interaction);
    }
  });
  // TODO ALEX: below move into a separate file
  client.on("messageCreate", async (msg) => {
    //<:talalcum:1107319395384041513> <a:catVibe:807920662911909888>
    // todo, refactor client set up so client is never null here via timing instantiation issues
    if (!client.user || msg.author.id === client.user.id)
      if (msg.author.username == "Aus Myth") return;
    if (msg.author.username == "Talal")
      msg.react("<:talalcum:1107319395384041513>");
    if (msg.author.username.includes("Flaww"))
      msg.react("<a:catVibe:807920662911909888>");
    if (msg.content === "gm") {
      //&& msg.author.username == 'Bean') {
      console.log(`${msg.author.username} posted a gm`);
      msg.reply("gm");
    }
    if (msg.content === "gn") {
      //&& msg.author.username == 'Bean') {
      console.log(`${msg.author.username} posted a gn`);
      msg.reply("No, only gm!");
    }
  });
};

const handleSlashCommand = async (
  client: Client,
  interaction: CommandInteraction
): Promise<void> => {
  const slashCommand = Commands.find((c) => c.name === interaction.commandName);
  if (!slashCommand) {
    interaction.followUp({ content: "An error has occurred" });
    return;
  }

  await interaction.deferReply();

  slashCommand.run(client, interaction);
};
