require('./set');
const fs = require('fs');
const path = require('path');
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const chalk = require('chalk');

// import your core modules
const { plugins } = require('./zeal');
const ZealUtils = require('./godszealfunc');

// --- Simple JSON File DB ---
class DataBase {
  constructor(file = path.join(__dirname, 'godszeal_db.json')) {
    this.file = file;
  }
  godszealRead() {
    try {
      return JSON.parse(fs.readFileSync(this.file, 'utf-8'));
    } catch {
      return null;
    }
  }
  godszealWrite(db) {
    fs.writeFileSync(this.file, JSON.stringify(db, null, 2));
  }
}

// --- Your message handler (customize as you like) ---
async function handleMessage(bot, msg) {
  const text = msg.text || '<no text>';
  console.log(chalk.blue(`[${msg.chat.id}] ${text}`));

  // example: echo in monospace
  const reply = ZealUtils.monospace(text);
  await bot.sendMessage(msg.chat.id, reply);
}

(async () => {
  // Express for health-check or webhooks
  const app = express();
  app.get('/', (_, res) =>
    res.sendFile(path.join(__dirname, 'zeal', 'godszeal.html'))
  );
  const PORT = process.env.PORT || 7000;
  app.listen(PORT, () =>
    console.log(chalk.green(`HTTP server listening on port ${PORT}`))
  );

  // Telegram bot setup
  const bot = new TelegramBot(global.botToken, { polling: true });
  console.log(chalk.bgGreen.black('✅ Telegram bot started!'));

  // show bot info
  const info = await bot.getMe();
  console.log(chalk.bold(JSON.stringify(info, null, 2)));

  // init or load DB
  const db = new DataBase();
  global.db = db.godszealRead() || { users: {}, groups: {} };
  db.godszealWrite(global.db);

  // auto-save every 5s
  setInterval(() => db.godszealWrite(global.db), 5000);

  // bind message handler
  bot.on('message', msg => handleMessage(bot, msg));

  // load & mount any plugins
  for (const plugin of plugins) {
    if (typeof plugin.init === 'function') {
      plugin.init(bot, ZealUtils, global.db);
    }
  }
})();