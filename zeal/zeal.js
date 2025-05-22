const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const godszealLoadPlugins = (godszealDirectory) => {
    const godszealPlugins = [];
    let godszealPluginFileCount = 0;
    const mouricedevsLoadFiles = (godszealDir) => {
        const godszealEntries = fs.readdirSync(godszealDir);
        godszealEntries.forEach(godszealEntry => {
            const giftedEntryPath = path.join(godszealDir, godszealEntry);
            if (fs.lstatSync(godszealEntryPath).isDirectory()) {
                mouricedevsLoadFiles(godszealEntryPath);
            } else if (giftedEntryPath.endsWith('.js')) {
                try {
                    delete require.cache[require.resolve(godszealEntryPath)];
                    const godszealPlugin = require(godszealEntryPath);
                    godszealPlugin.filePath = godszealEntryPath;
                    godszealPlugins.push(godszealPlugin);
                    godszealPluginFileCount++;
                    console.log(chalk.bgHex('#ADD8E6').hex('#333').bold(` Loaded Plugin: ${path.basename(godszealEntryPath)} `));
                } catch (error) {
                    console.log(chalk.bgHex("#e74c3c").bold(` Error loading plugin at ${godszealEntryPath}:`, error ));
                }
            }
        });
    };
    const godszealResolvedDirectory = path.resolve(godszealDirectory);
    if (fs.existsSync(godszealResolvedDirectory) && fs.lstatSync(godszealResolvedDirectory).isDirectory()) {
        mouricedevsLoadFiles(godszealResolvedDirectory);
    } else {
        console.log(chalk.bgHex("#e74c3c").bold(` Invalid directory: ${godszealResolvedDirectory}` ));
    }
    return { plugins: giftedPlugins, pluginFileCount: godszealPluginFileCount };
};

const { plugins, pluginFileCount } = giftedLoadPlugins(path.join(process.cwd(), 'godszeal'));
console.log(chalk.bgHex('#90EE90').hex('#333').bold(' All Plugins loaded! '));

module.exports = { plugins, pluginFileCount };
