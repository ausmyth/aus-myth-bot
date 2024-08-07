# Aus Myth Discord Bot

https://discord.com/invite/ausmyth

This bot is simply for running some clan specific scripts for now. In the future we could potentially replace some other bots with functionality here.

## How to run
1. `yarn install`
2. `cp .env.example .env`
3. Add your discord token to the environment
3. `yarn start`

## Slash commands
1. /hello
    - Returns a greeting

## 

## Todo
[] Add everyone in discord to a sql db with any data we can to track
[] Add in game usernames to a sql db `ingame_usernames`
    - `username: string, rank: string, currently_ranked: bool, last modified: date, discord: string, prev_names: string[], note: string, ban_note: string[]`
    - connect to google spreadsheet for admins to view
    - slash commands to edit these via discord
[] Add permissions for who may use which command
[] Run activity checks on names that are currently ranked
    - simple script to pull data from temple and check activity as we do now manually via competitions feature
[] Add event/announcement posting slash command, so we can make the bot post messages for the admin team if needed
    - needs to check the poster's permissions for the channel, should not be able to use the bot as a bypass
    - slash commands for editing
