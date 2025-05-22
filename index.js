require('./set');
const path = require('path');
const express = require('express');
const GodszealMd = require('node-telegram-bot-api'); 
const chalk = require('chalk');
const { customMessage: GodszealMess, DataBase: GodszealDB } = require('./zeal');
const godszealdb = new GodszealDB();
let Godszeal;
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './zeal/godszeal.html'));
});

const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`App running on port ${port}`));

async function startGodszeal() {
    if (!Gifted) {
        Gifted = new GodszealMd(`${global.botToken}`, { polling: true });

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
            if (global.db) await godszealdb.giftedWrite(global.db);
        }, 5000);

        Godszeal.on('message', async (m) => {
            await GodszealMess(Godszeal, m);
        });

        require('./zeal/godszeal')(Godszeal);
    }
}

startGodszeal();
