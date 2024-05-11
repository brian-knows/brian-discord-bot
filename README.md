# 🧠 Brian Discord Bot

Welcome to the Brian Discord Bot repository! This bot is a simple Discord Bot that allows you to ask Brian questions while remaining in your Discord server.

## 👾 Server installation

In order to install the bot on your server, you just need to open
[this link](https://discord.com/oauth2/authorize?client_id=1121781275825541178) in your browser. Discord will prompt you to choose the Discord server where you want to install the bot.

## 📦 On-premise installation

If you want to install the bot on your own server, you can follow these steps:

1. Clone the repository

```bash
git clone https://github.com/brian-knows/brian-discord-bot.git
```

2. Install the dependencies

```bash
yarn install
```

3. Create a `.env` file with the following content:

```bash
CLIENT_TOKEN="" # Your Discord bot token
BRIAN_API_KEY="" # Your Brian API key
```

4. Build and start the bot

```bash
yarn build
pm2 start dist/index.js
```

We suggest using [pm2](https://pm2.keymetrics.io/) to manage the bot process. Otherwise you can simply start it using node.
