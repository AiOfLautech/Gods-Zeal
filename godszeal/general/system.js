const moment = require('moment-timezone'),
      { platform, totalmem: totalMemoryBytes, 
       freemem: freeMemoryBytes } = require('os');

const byteToKB = 1 / 1024;
const byteToMB = byteToKB / 1024;
const byteToGB = byteToMB / 1024;

function formatBytes(bytes) {
  if (bytes >= Math.pow(1024, 3)) {
    return (bytes * byteToGB).toFixed(2) + ' GB';
  } else if (bytes >= Math.pow(1024, 2)) {
    return (bytes * byteToMB).toFixed(2) + ' MB';
  } else if (bytes >= 1024) {
    return (bytes * byteToKB).toFixed(2) + ' KB';
  } else {
    return bytes.toFixed(2) + ' bytes';
  }
}

const ram = `${formatBytes(freeMemoryBytes)}/${formatBytes(totalMemoryBytes)}`;

let Godszeald = async (m, { Godszeal, plugins, prefix, ownerUsername, botVersion, timeZone, botPic }) => {
  const groupedPlugins = plugins.reduce((groups, plugin) => {
    if (plugin.command && Array.isArray(plugin.command)) {
      const categories = Array.isArray(plugin.category) ? plugin.category : [plugin.category || 'other'];
      categories.forEach(category => {
        if (!groups[category]) groups[category] = [];
        groups[category].push(plugin);
      });
    }
    return groups;
  }, {});

  function formatUptime(seconds) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds %= 24 * 60 * 60;
    const hours = Math.floor(seconds / (60 * 60));
    seconds %= 60 * 60;
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  const now = new Date();
  const date = new Intl.DateTimeFormat('en-GB', {
    timeZone: `${global.timeZone}`,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(now);

  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone: `${global.timeZone}`,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(now);

  const uptime = formatUptime(process.uptime());

  let totalCommands = 0;
  for (const items of Object.values(groupedPlugins)) {
    totalCommands += items.length;
  }

  let godszealButtons = [
    [
      { text: 'Owner', url: `https://t.me/${global.ownerUsername}` },
      { text: 'Help', callback_data: JSON.stringify({ feature: 'help' }) },
    ],
    [
      { text: 'WaChannel', url: global.godszealWaChannel },
    ],
  ];

  const godszealMess = `
⧫️───────────────────⧫️
    *BOT SYSTEM STATUS*
⧫️───────────────────⧫️

🚅 *Prefix:*  [ ${global.prefix} ]
👮 *Owner:*  @${global.ownerUsername}
🎯 *Version:*  ${global.botVersion}
🛜 *Plugins:* ${totalCommands.toString()}
⏰ *Uptime:* ${uptime} 
🕐 *Time Now:*  ${time}
📆 *Date Today:*  ${date}
🏷️ *Platform:* ${platform}
🏞 *Time Zone:* ${global.timeZone}
💻 *RAM Usage:* ${ram}

⧫️───────────────────⧫️`;

  await Godszeal.reply({ image: { url: `${global.botPic}` }, caption: godszealMess, parse_mode: 'Markdown' }, godszealButtons, m);
};

Godszeald.command = ['system', 'info', 'status'];
Godszeald.desc = 'Display Bot System Status';
Godszeald.category = ['general'];

module.exports = Godszeald;
