require('./set'); const path = require('path'); const express = require('express'); const TelegramBot = require('node-telegram-bot-api'); const chalk = require('chalk'); const { customMessage: GodszealMess, DataBase: GodszealDB } = require('./zeal');

const godszealdb = new GodszealDB(); let Godszeal;

const app = express(); app.get('/', (req, res) => { res.sendFile(path.join(__dirname, './zeal/godszeal.html')); });

const port = process.env.PORT || 7000; app.listen(port, () => console.log(App running on port ${port}));

/**

Initializes and starts the Telegram bot. */ async function startGodszeal() { if (!Godszeal) { Godszeal = new TelegramBot(global.botToken, { polling: true }); console.log(chalk.bgHex('#90EE90').hex('#333').bold(' GOD/S ZEAL MD Connected '));

const miscInfo = await Godszeal.getMe(); console.log(chalk.white.bold('—————————————————')); console.log('Bot Info:', JSON.stringify(miscInfo, null, 2)); console.log(chalk.white.bold('—————————————————'));

// Load or initialize database const loadData = await godszealdb.godszealRead(); if (!loadData) { global.db = { users: {}, groups: {} }; await godszealdb.godszealWrite(global.db); } else { global.db = loadData; }

// Periodically write DB to storage setInterval(async () => { if (global.db) await godszealdb.godszealWrite(global.db); }, 5000);

// Message handler Godszeal.on('message', async (msg) => { await GodszealMess(Godszeal, msg); });

// Load additional handlers/plugins require('./zeal/godszeal')(Godszeal); } }


startGodszeal();

