const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const godszealLoadPlugins = (godszealDirectory) => {
    const godszealPlugins = [];
    let godszealPluginFileCount = 0;

    const traverseAndLoad = (directory) => {
        const entries = fs.readdirSync(directory);
        entries.forEach(entry => {
            const entryPath = path.join(directory, entry);
            if (fs.lstatSync(entryPath).isDirectory()) {
                traverseAndLoad(entryPath);
            } else if (entryPath.endsWith('.js')) {
                try {
                    delete require.cache[require.resolve(entryPath)];
                    const plugin = require(entryPath);
                    plugin.filePath = entryPath;
                    godszealPlugins.push(plugin);
                    godszealPluginFileCount++;
                    console.log(chalk.bgHex('#ADD8E6').hex('#333').bold(` Loaded Plugin: ${path.basename(entryPath)} `));
                } catch (error) {
                    console.log(chalk.bgHex('#e74c3c').bold(` Error loading plugin at ${entryPath}: ${error.message}`));
                }
            }
        });
    };

    const resolvedDir = path.resolve(godszealDirectory);
    if (fs.existsSync(resolvedDir) && fs.lstatSync(resolvedDir).isDirectory()) {
        traverseAndLoad(resolvedDir);
    } else {
        console.log(chalk.bgHex('#e74c3c').bold(` Invalid directory: ${resolvedDir} `));
    }

    return { plugins: godszealPlugins, pluginFileCount: godszealPluginFileCount };
};

// Load plugins from the 'godszeal' directory
const { plugins, pluginFileCount } = godszealLoadPlugins(path.join(process.cwd(), 'godszeal'));
console.log(chalk.bgHex('#90EE90').hex('#333').bold(` All Plugins loaded! Total: ${pluginFileCount} `));

module.exports = { plugins, pluginFileCount };
