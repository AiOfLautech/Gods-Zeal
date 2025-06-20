process.on('uncaughtException', console.error);
process.on('unhandledRejection', console.error);
require('../set');
const { handleCases } = require('../godszeal/case');

const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const chalk = require('chalk');
const util = require('util');

const { fetchJson, clockString, pickRandom, runtime, formatp, executeCommand, loadDatabase, plugins, pluginFileCount, GodszealApkDl, monospace } = require('./index');

module.exports = async (Godszeal) => {
    
    Godszeal.on('message', async (m) => {
        await loadDatabase(Godszeal, m);
        
        const chatId = m.chat.id;
        const userId = m.from.id;
        const chatType = m.chat.type;
        
        if (m.text && m.text.startsWith('=>')) {
            if (!m.isOwner) return;
            function Return(result) {
                GodszealDevs = JSON.stringify(result, null, 2);
                GodszealDevs = util.format(GodszealDevs);
                if (GodszealDevs == undefined) {
                    GodszealDevs = util.format(result);
                }
                return Godszeal.reply({ text: `\`\`\`\n${GodszealDevs}\n\`\`\``, parse_mode: 'Markdown' }, m);
            }
            try {
                await Godszeal.reply({ text: `\`\`\`\n${util.format(eval(`(async () => { return ${m.text.slice(3).trim()} })()`))}\n\`\`\``, parse_mode: 'Markdown' }, m);
            } catch (e) {
                await Godszeal.reply({ text: `\`\`\`\n${String(e)}\n\`\`\``, parse_mode: 'Markdown' }, m);
            }
        }
        if (m.text && m.text.startsWith('$')) {
            if (!m.isOwner) return;
            const codeToEval = m.text.slice(1).trim();
            try {
                const result = await executeCommand(codeToEval);
                await Godszeal.reply({ text: `\`\`\`\n${result}\n\`\`\``, parse_mode: 'Markdown' }, m);
            } catch (error) {
                await Godszeal.reply({ text: `\`${error.message}\``, parse_mode: 'Markdown' }, m);
            }
        }
        if (m.text && m.text.startsWith('>')) {
            if (!m.isOwner) return;
            try {
                const codeToEval = m.text.slice(1).trim();
                const result = await eval(`(async () => { ${codeToEval} })()`);
                let message = result;
                if (typeof result === 'object') {
                    message = JSON.stringify(result, null, 2);
                }
                await Godszeal.reply({ text: `\`\`\`\n${message}\n\`\`\``, parse_mode: 'Markdown' }, m);
            } catch (error) {
                await Godszeal.reply({ text: `\`${error.message}\``, parse_mode: 'Markdown' }, m);
            }
        }
        
        if (m.text) {
            console.log('\x1b[30m--------------------\x1b[0m');
            console.log(chalk.bgHex("#e74c3c").bold(` ${botName} NEW MESSAGE! `));
            console.log(
                `   - Date: ${new Date().toLocaleString('id-ID')} WIB \n` +
                `   - Message: ${m.text} \n` +
                `   - Sender Name: ${m.from.first_name} \n` +
                `   - Sender UserName: ${m.from.username} \n` +
                `   - ID: ${m.from.id}`
            );
            if (chatType === 'group' || chatType === 'supergroup') {
                console.log(
                    `   - Group: ${m.chat.title} \n` +
                    `   - GroupID: ${m.chat.id}`
                );
            }
            console.log();
        }
    });
    
    Godszeal.onText(`^(?:${global.prefix})(\\w+)`, async (m, match) => {
        try {
            const chatId = m.chat.id;
            const userId = m.from.id;
            const chatType = m.chat.type;
            let command = match[1];
            const text = m.text.trim().slice(command.length + 2).trim();
            const userName = m.from.username || m.from.first_name || 'Unknown';
            const userTag = userName.startsWith('@') ? userName : `@${userName}`;
            
            if (command) {
                await Godszeal.sendChatAction(chatId, 'typing');
            }

            if (text) {
                await Godszeal.sendChatAction(chatId, 'typing');
            }
            
            const GodszealTech = {
                Godszeal,
                text,
                monospace,
                GodszealApkDl,
                command,
                fetchJson,
                chatId,
                userId,
                sender: m.from.username,
                chatType,
                pickRandom,
                plugins,
            };
            for (const plugin of plugins) {
                try {
                    if (typeof plugin.before === "function") {
                        if (plugin.before(m, GodszealTech)) continue;
                    }
                    // SAFELY CHECK plugin.command
                    if (
                        plugin.command &&
                        (
                            (Array.isArray(plugin.command) && plugin.command.includes(command)) ||
                            (typeof plugin.command === 'string' && plugin.command === command)
                        )
                    ) {
                        await Godszeal.sendChatAction(chatId, 'typing');
                        if (plugin?.settings?.owner && !m.isOwner) {
                            return Godszeal.reply(zealtechMess.owner, m);
                        }
                        if (plugin?.settings?.group && !m.isGroup) {
                            return Godszeal.reply(zealtechMess.group, m);
                        }
                        if (plugin?.settings?.private && !m.isPrivate) {
                            return Godszeal.reply(zealtechMess.private, m);
                        }
                        if (typeof plugin === "function") {
                            await plugin(m, GodszealTech);
                        } else if (plugin.run) {
                            await plugin.run(m, GodszealTech);
                        }
                        handled = true;
                        break;
                    }
                } catch (error) {
                    console.error(`Error executing plugin ${plugin.filePath}:`, error);
                }
            }
            handleCases(m, GodszealTech);
        } catch (err) {
            console.log(err);
            Godszeal.reply({ text: `${err}`, parse_mode: 'Markdown' }, m);
        }
    });
    
    Godszeal.on('callback_query', async (callbackQuery) => {
        const { data, message: m } = callbackQuery;
        try {
            const parsedData = JSON.parse(data);
            
            let GodszealDevs = {
                Godszeal,
                monospace,
                GodszealApkDl,
                text: parsedData.data || '',
                command: parsedData.feature,
                fetchJson,
                pickRandom,
                chatId: m.chat.id,
                userId: m.from.id,
                sender: m.from.username,
                plugins,
            };
            if (parsedData.feature) {
                for (const plugin of plugins) {
                    try {
                        // SAFELY CHECK plugin.command
                        if (
                            plugin.command &&
                            (
                                (Array.isArray(plugin.command) && plugin.command.includes(parsedData.feature)) ||
                                (typeof plugin.command === 'string' && plugin.command === parsedData.feature)
                            )
                        ) {
                            if (typeof plugin === "function") {
                                await plugin(m, GodszealDevs);
                            } else if (plugin.run) {
                                await plugin.run(m, GodszealDevs);
                            }
                            await Godszeal.answerCallbackQuery(callbackQuery.id);
                            handled = true;
                            break;
                        }
                    } catch (error) {
                        console.error(`Error executing plugin ${plugin.filePath}:`, error);
                    }
                }
                handleCases(m, GodszealDevs);
                await Godszeal.answerCallbackQuery(callbackQuery.id);
            }
        } catch (err) {
            console.log(err);
            Godszeal.reply({ text: `${err}`, parse_mode: 'Markdown' }, m);
        }
    });
};
