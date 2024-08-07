import { Client } from "discord.js";
import { Commands } from "../Commands";

export default (client: Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) {
      return;
    }

    await client.application.commands.set(Commands);

    console.log(`${client.user.username} is online`);

    // listMembers(client) // todo: abstract this into a function omg lol
  });
  client.on("rateLimit", async () => {
    console.log("RATE LIMITED");
  });
};

async function listMembers(client: Client) {
  console.log("butter");

  // Get Aus Myth guild
  const id = "746305408272171078";
  const guild = client.guilds.cache.find((g) => g.id === id);
  console.log("here");

  if (!guild) {
    console.log(`Can't find any guild with the ID "${id}"`);
    return;
  }
  console.log("Waiting for members list...");
  const members = await guild.members.fetch();
  console.log("Got them!");
  // console.log(members)

  console.log("Username, Nickname, Join date (Aus/syd time) ");
  members.forEach((member) =>
    console.log(
      member.user.username,
      ",",
      member.displayName,
      ",",
      member.joinedAt!.toLocaleString("en-US", { timeZone: "Australia/Sydney" })
    )
  );
  console.log(members.size);
}
