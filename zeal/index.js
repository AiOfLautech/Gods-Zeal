const { DataBase } = require('./godszealdb');
const { plugins, pluginFileCount } = require('./zeal');
const { loadDatabase, customMessage } = require('./godszealmd');
const { fetchJson, clockString, pickRandom, runtime, formatp, executeCommand, monospace, GodszealApkDl, getBuffer } = require('./godszealfunc')

module.exports = { plugins, pluginFileCount, DataBase, loadDatabase, customMessage, fetchJson, clockString, pickRandom, getBuffer, runtime, formatp, executeCommand, monospace, GodszealApkDl };