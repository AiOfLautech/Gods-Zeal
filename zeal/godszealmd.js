require('../set');
const fs = require('fs');
const axios = require('axios');
const fetch = require('node-fetch');
const chalk = require('chalk');
const path = require('path');

async function godszealLoadDatabase(Godszeal, m) {
    const userId = m.from.id;
    const chatId = m.chat.id;
    const chatType = m.chat.type;
    if (!db.users[userId]) {
        db.users[userId] = {
            username: m.from.username
        };
    }
    if (chatType === 'group' || chatType === 'supergroup') {
        if (!db.groups[chatId]) {
            db.groups[chatId] = {
                groupName: m.chat.title
            };
        }
    }
}

async function godszealCustomMessage(Godszeal, m) {
    const userId = m.from.id;
    const chatId = m.chat.id;
    const chatType = m.chat.type;
    
    if (m) {
        m.isOwner = ownerId.includes(userId) || false
        m.isPrivate = (chatType !== 'group' && chatType !== 'supergroup' && chatType !== 'channel') || false
        m.isGroup = (chatType === 'group' || chatType === 'supergroup') || false
    }
    
    Godszeal.reply = async (content, buttonsOrMsg, m) => {
        try {
            let buttons = [];
            
            if (typeof buttonsOrMsg === 'object') {
                if (Array.isArray(buttonsOrMsg)) {
                    buttons = buttonsOrMsg.map(row => {
                        if (Array.isArray(row)) {
                            return row.map(button => {
                                if (button.feature) {
                                    return { text: button.text, callback_data: JSON.stringify({ feature: button.feature, data: button.data || '' }) };
                                } else if (button.callback_data) {
                                    return { text: button.text, callback_data: button.callback_data };
                                } else if (button.url) {
                                    return { text: button.text, url: button.url };
                                } else {
                                    return button;
                                }
                            });
                        } else {
                            if (row.feature) {
                                return [{ text: row.text, callback_data: JSON.stringify({ feature: row.feature, data: row.data || '' }) }];
                            } else if (row.callback_data) {
                                return [{ text: row.text, callback_data: row.callback_data }];
                            } else if (row.url) {
                                return [{ text: row.text, url: row.url }];
                            } else {
                                return [row];
                            }
                        }
                    });
                } else if (buttonsOrMsg.chat && buttonsOrMsg.message_id) {
                    m = buttonsOrMsg;
                } else {
                    content = { ...content, ...buttonsOrMsg };
                }
            }
            
            if (m.message_id) {
                content.reply_to_message_id = m.message_id;
            } else {
                content.reply_to_message_id = null
            }
            
            if (buttons.length > 0) {
                content.reply_markup = { inline_keyboard: buttons };
            }
            
            if (typeof content === 'object') {
                if (content.image) {
                    return await Godszeal.sendPhoto(m.chat.id, content.image.url || content.image, content);
                }
                if (content.video) {
                    return await Godszeal.sendVideo(m.chat.id, content.video.url || content.video, content);
                }
                if (content.audio) {
                    return await Godszeal.sendAudio(m.chat.id, content.audio.url || content.audio, content);
                }
                if (content.document) {
                    return await Godszeal.sendDocument(m.chat.id, content.document.url || content.document, content);
                }
                if (content.text) {
                    return await Godszeal.sendMessage(m.chat.id, content.text, content);
                }
                throw new Error('Unsupported content type.');
            }
            
            throw new Error('Invalid content type.');
        } catch (error) {
            console.error('Godszeal.reply error:', error.message);
            await Godszeal.sendMessage(m.chat.id, `Failed to send message: ${error.message}`, {});
        }
    };
    
    Godszeal.downloadAndSend = async (data, buttonsOrMsg, m) => {
        try {
            let buttons = [];
            
            if (typeof buttonsOrMsg === 'object') {
                if (Array.isArray(buttonsOrMsg)) {
                    buttons = buttonsOrMsg.map(row => {
                        if (Array.isArray(row)) {
                            return row.map(button => {
                                if (button.feature) {
                                    return { text: button.text, callback_data: JSON.stringify({ feature: button.feature, data: button.data || '' }) };
                                } else if (button.callback_data) {
                                    return { text: button.text, callback_data: button.callback_data };
                                } else if (button.url) {
                                    return { text: button.text, url: button.url };
                                } else {
                                    return button;
                                }
                            });
                        } else {
                            if (row.feature) {
                                return [{ text: row.text, callback_data: JSON.stringify({ feature: row.feature, data: row.data || '' }) }];
                            } else if (row.callback_data) {
                                return [{ text: row.text, callback_data: row.callback_data }];
                            } else if (row.url) {
                                return [{ text: row.text, url: row.url }];
                            } else {
                                return [row];
                            }
                        }
                    });
                } else if (buttonsOrMsg.chat && buttonsOrMsg.message_id) {
                    m = buttonsOrMsg;
                } else {
                    data = { ...data, ...buttonsOrMsg };
                }
            }
            
            if (m.message_id) {
                data.reply_to_message_id = m.message_id;
            } else {
                data.reply_to_message_id = null
            }
            
            if (buttons.length > 0) {
                data.reply_markup = { inline_keyboard: buttons };
            }
            
            const type = Object.keys(data)[0];
            const url = data[type];
            const customFileName = data.fileName || `${Date.now()}`;
    
            const ext = path.extname(url).split('?')[0] || '';
            const fileName = `${customFileName}${ext}`;
            const filePath = path.resolve(__dirname, '..', 'temp', fileName);

            const tempDir = path.resolve(__dirname, '..', 'temp');
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir, { recursive: true });
            }
    
            const writer = fs.createWriteStream(filePath);
            const response = await axios({
                url,
                method: 'GET',
                responseType: 'stream',
            });
    
            response.data.pipe(writer);
    
            await new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });
    
            if (typeof data === 'object') {
                if (data.image) {
                    return await Godszeal.sendPhoto(m.chat.id, filePath, data);
                }
                if (data.video) {
                    return await Godszeal.sendVideo(m.chat.id, filePath, data);
                }
                if (data.audio) {
                    return await Godszeal.sendAudio(m.chat.id, filePath, data);
                }
                if (data.document) {
                    return await Godszeal.sendDocument(m.chat.id, filePath, data);
                }
                throw new Error('Unsupported content type.');
            }
            
            fs.unlinkSync(filePath);
        } catch (error) {
            console.error(`Error in downloadAndSend: ${error.message}`);
            await Godszeal.sendMessage(m.chat.id, `Failed to send message: ${error.message}`, {});
        } finally {
             const tempDir = path.resolve(__dirname, '..', 'temp');
             fs.readdirSync(tempDir).forEach(file => {
                 const fileToDelete = path.join(tempDir, file);
                 try {
                     fs.unlinkSync(fileToDelete);
                 } catch (err) {
                     console.error(`Failed to delete temp file: ${fileToDelete}`, err);
                 }
             });
        }
    };
}

module.exports = { loadDatabase: godszealLoadDatabase, customMessage: godszealCustomMessage };