require('./set');
const path = require('path');
const express = require('express');
const GodszealMd = require('node-telegram-bot-api');
const chalk = require('chalk');
const { customMessage: GodszealMess, DataBase: GodszealDB } = require('./zeal/godszealmd');
const GodszealFunc = require('./zeal/godszealfunc'); // Only utilities
const godszealdb = new GodszealDB();
let Godszeal;

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './zeal/godszeal.html'));
});

function getAvailablePort(startPort, cb) {
    const net = require('net');
    const server = net.createServer();
    server.listen(startPort, () => {
        server.once('close', () => cb(startPort));
        server.close();
    });
    server.on('error', () => getAvailablePort(startPort + 1, cb));
}

getAvailablePort(process.env.PORT ? parseInt(process.env.PORT) : 10000, (port) => {
    app.listen(port, () => console.log(`App running on port ${port}`));

    async function startGodszeal() {
        if (!Godszeal) {
            // Use polling for dev, webhook for prod
            const isProduction = process.env.NODE_ENV === 'production';
            if (isProduction) {
                Godszeal = new GodszealMd(`${global.botToken}`, {
                    webHook: { port }
                });
                const webhookUrl = process.env.WEBHOOK_URL || `https://gods-zeal.onrender.com/bot${global.botToken}`;
                Godszeal.setWebHook(webhookUrl);
                console.log(chalk.green(`Webhook set to: ${webhookUrl}`));
            } else {
                Godszeal = new GodszealMd(`${global.botToken}`, { polling: true });
                console.log(chalk.green('Bot started in polling mode (development)'));
            }

            console.log(chalk.bgHex('#90EE90').hex('#333').bold(' GOD/S ZEAL MD Connected '));
            const miscInfo = await Godszeal.getMe();
            console.log(chalk.white.bold('—————————————————'));
            console.log('Bot Info: ', JSON.stringify(miscInfo, null, 2));
            console.log(chalk.white.bold('—————————————————'));

            const loadGodszealData = await godszealdb.godszealRead();
            if (loadGodszealData && Object.keys(loadGodszealData).length === 0) {
                global.db = {
                    users: {},
                    groups: {},
                    ...(loadGodszealData || {}),
                };
                await godszealdb.godszealWrite(global.db);
            } else {
                global.db = loadGodszealData;
            }
            setInterval(async () => {
                if (global.db) await godszealdb.godszealWrite(global.db);
            }, 5000);

            Godszeal.on('message', async (m) => {
                await GodszealMess(Godszeal, m); // Only pass required dependencies
            });

            // DO NOT require zeal/index.js here! Only require files you need directly.
            require('./zeal/godszeal')(Godszeal);
        }
    }

    startGodszeal();
});