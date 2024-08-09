function getEnvVariable(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
}

export const CONFIG = {
  // Discord bot configuration
  discordToken: getEnvVariable("DISCORD_TOKEN"),
  guildId: getEnvVariable("GUILD_ID"),

  // Channel IDs
  botChannelId: getEnvVariable("BOT_CHANNEL_ID"),

  // Postgres database configuration
  dbHost: getEnvVariable("DB_HOST"),
  dbUser: getEnvVariable("DB_USER"),
  dbPass: getEnvVariable("DB_PASS"),
  dbName: getEnvVariable("DB_NAME"),
};
