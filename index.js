#!/usr/bin/env node

// Core Dependencies
const fs = require('fs');
const path = require('path');
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const chalk = require('chalk');

// Load environment configuration
require('./set');

// Database Class
class DataBase {
  constructor(file = path.join(__dirname, 'godszeal_db.json')) {
    this.file = file;
  }

  /**
   * Reads and parses the database file
   * @returns {Object|null} Parsed JSON data or null if error
   */
  async godszealRead() {
    try {
      const raw = fs.readFileSync(this.file, 'utf-8');
      return JSON.parse(raw);
    } catch (error) {
      console.error(chalk.red('DB read error:'), error);
      return null;
    }
  }

  /**
   * Writes data to the database file
   * @param {Object} db - Data to write
   */
  async godszealWrite(db) {
    try {
      fs.writeFileSync(this.file, JSON.stringify(db, null, 2));
    } catch (error) {
      console.error(chalk.red('DB write error:'), error);
    }
  }
}

// Message Handler
/**
 * Handles incoming Telegram messages
 * @param {TelegramBot} bot - Telegram bot instance
 * @param {Object} msg - Message object
 */
async function customMessage(bot, msg) {
  console.log(chalk.blue(`Received message from ${msg.chat.id}: ${msg.text}`));
  // TODO: Implement custom message handling logic
}

// Global Variables
const godszealdb = new DataBase();
let Godszeal;

// Express Server Setup
const app = express();
const port = process.env.PORT || 7000;

/**
 * Configures Express routes
 */
function setupExpress() {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './zeal/godszeal.html'));
  });

  app.listen(port, () => {
    console.log(chalk.green(`App running on port ${port}`));
  });
}

/**
 * Initializes and starts the Telegram bot
 */
async function startGodszeal() {
  try {
    // Initialize Telegram Bot
    if (!Godszeal) {
      Godszeal = new TelegramBot(global.botToken, { polling: true });
      console.log(chalk.bgHex('#90EE90').hex('#333').bold(' GOD/S ZEAL MD Connected '));

      // Log bot information
      const miscInfo = await Godszeal.getMe();
      console.log(chalk.white.bold('—————————————————'));
      console.log('Bot Info:', JSON.stringify(miscInfo, null, 2));
      console.log(chalk.white.bold('—————————————————'));
    }

    // Initialize Database
    const loadData = await godszealdb.godszealRead();
    global.db = loadData || { users: {}, groups: {} };
    await godszealdb.godszealWrite(global.db);

    // Periodic Database Backup
    setInterval(async () => {
      if (global.db) {
        await godszealdb.godszealWrite(global.db);
      }
    }, 5000);

    // Register Message Handler
    Godszeal.on('message', async (msg) => {
      await customMessage(Godszeal, msg);
    });

    // Load Additional Plugins
    // require('./zeal/godszeal')(Godszeal);

  } catch (error) {
    console.error(chalk.red('Failed to start Godszeal:'), error);
  }
}

/**
 * Main application initialization
 */
async function main() {
  setupExpress();
  await startGodszeal();
}

// Start the application
main().catch((error) => {
  console.error(chalk.red('Application initialization failed:'), error);
  process.exit(1);
});