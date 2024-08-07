# Aus Myth Discord Bot

Join our Discord [here!](https://discord.com/invite/ausmyth)

This is a private bot, written in the public. This bot is currently used for running clan-specific scripts. Future plans include expanding functionality to replace some other bots.

## How to run

#### Docker

Documentation coming soon...

#### Local

1. **Install dependencies:**
   ```sh
   yarn install
   ```
2. **Create a local environment configuration:**
   ```sh
   cp .env.example .env
   ```
3. **Add your Discord token to the .env file.**
4. **Build the project:**
   ```sh
   yarn build
   ```
5. **Start the bot:**
   ```sh
   yarn start
   ```

## Slash commands

1. /hello
   - Returns a greeting
2. /talalcheck
   - Tells you if Talal recieved the Farming pet yet
3. /diceroll [sides]
   - Rolls a dice, optional sides, default is 6

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
