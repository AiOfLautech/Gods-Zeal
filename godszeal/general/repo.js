const axios = require('axios');

let Godszeald = async (m, { Godszeal, sender }) => {
  const repoUrl = global.godszealApiRepo;
  const response = await axios.get(repoUrl);
  const repoData = response.data;
  const { name, forks_count, stargazers_count, html_url, created_at, updated_at, owner } = repoData;

  let godszealMess = `Hello *@${sender},*\nThis is *God's Zeal MD,* A Telegram Bot Built by *@${global.ownerUsername},* Enhanced with Amazing Features to Make Your Telegram Communication and Interaction Experience Amazing\n\n*ʀᴇᴘᴏ ʟɪɴᴋ:* ${global.godszealRepo}\n\n*❲❒❳ ɴᴀᴍᴇ:* ${name}\n*❲❒❳ sᴛᴀʀs:* ${stargazers_count}\n*❲❒❳ ғᴏʀᴋs:* ${forks_count}\n*❲❒❳ ᴄʀᴇᴀᴛᴇᴅ ᴏɴ:* ${new Date(created_at).toLocaleDateString()}\n*❲❒❳ ʟᴀsᴛ ᴜᴘᴅᴀᴛᴇᴅ:* ${new Date(updated_at).toLocaleDateString()}\n*❲❒❳ ᴏᴡɴᴇʀ:* ${owner.login}`;

  let godszealButtons = [
    [
      { text: 'Owner', url: `https://t.me/${global.ownerUsername}` },
    ],
    [
      { text: 'Open Repo', url: global.godszealRepo }, 
      { text: 'WaChannel', url: global.godszealWaChannel }
    ]
  ];

  Godszeal.reply({ image: { url: global.botPic }, caption: godszealMess, parse_mode: 'Markdown' }, godszealButtons, m);
};

Godszeald.command = ['repo', 'sc', 'script'];
Godszeald.desc = 'Show Bot Repo';
Godszeald.category = ['general'];

module.exports = Godszeald;
