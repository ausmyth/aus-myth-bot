# Aus Myth Discord Bot

Join our Discord [here!](https://discord.com/invite/ausmyth)

This is a private bot, written in the public. This bot is currently used for running clan-specific scripts. Future plans include expanding functionality to replace some other bots.

## How to run

#### Docker

Documentation coming soon... (Not added docker-compose.yml yet)

- **Rebuild and restart image:**
  ```sh
  sudo docker compose build bot && sudo docker compose up -d bot
  ```
- **Check bot logs from image:**
  ```sh
  sudo docker compose logs bot
  ```

#### Local

1. **Install dependencies:**
   ```sh
   yarn install
   ```
2. **Create a local environment configuration:**
   ```sh
   cp .env.example .env
   ```
3. **Edit the .env file.**
4. **Build the project:**
   ```sh
   yarn build
   ```
5. **Start the bot:**
   ```sh
   yarn start
   ```

## Slash commands

1. /talalcheck
   - Tells you if Talal recieved the Farming pet yet
2. /diceroll [sides]
   - Rolls a dice, optional sides, default is 6

... Not including all as development is fast atm.

## Bugs

- Seem to be double registering commands - showing twice in discord.
- Caching manager is not fully confident.
- The docker-compose.yml used to test and run this, isnt in this repo. Because cache is kept on a directory level "up", this might fail local testing.
- Env vars being imported is no longer using dotenv, so user needs to ensure these are imported on run, this should be fixed with a check on startup to optionally attempt to import them.

## Todo

- Make all commands "Guild-specific" so commands update instantly.
- Make start up logs more informative on what got loaded.
- Refactor outdated code written in the early stages of the project.
- Implement database functionality to log bot actions.
- Set up logging of bot actions to a specified channel.
- Make `/message` command for sending messages from the bot.
- Make reaction role messages.
- Make rank up forms via bot.
- Permissioned commands functionality.
- Active check commands.
- Create event sign-up messages (optional: roles, channel access, update role call message).
- Bot metrics and panic @mod messages when server is not healthy.
- Move hosting vps to a cheaper / aus company.
- Make metrics across managers all use a singular metrics class
- The gm counter tracks any word with gm inside of it, need a better regex lol
