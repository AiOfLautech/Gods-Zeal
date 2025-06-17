const axios = require('axios');

let Godszeald = async (m, { Godszeal, sender }) => {
  // Use authenticated API call if GITHUB_TOKEN is set, to avoid rate limits
  const repoUrl = global.godszealApiRepo;
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'axios/1.10.0',
  };
  if (GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  }

  let repoData;
  try {
    const response = await axios.get(repoUrl, { headers });
    repoData = response.data;
  } catch (error) {
    let msg = 'Error fetching repo data.';
    if (error.response && error.response.data && error.response.data.message) {
      msg += ` Reason: ${error.response.data.message}`;
    }
    await Godszeal.reply(msg, [], m);
    return;
  }
  const { name, forks_count, stargazers_count, html_url, created_at, updated_at, owner } = repoData;

  let godszealMess = `Hello *@${sender},*
This is *God's Zeal MD,* A Telegram Bot Built by *@${global.ownerUsername},* Enhanced with Amazing Features to Make Your Telegram Communication and Interaction Easier!

*Repository*: [${name}](${html_url})
*Owner*: ${owner.login}
*Stars*: ${stargazers_count}
*Forks*: ${forks_count}
*Created*: ${created_at}
*Updated*: ${updated_at}

Want to contribute or deploy your own? Check the repo below!`;

  let godszealButtons = [
    [
      { text: 'Owner', url: `https://t.me/${global.ownerUsername}` },
    ],
    [
      { text: 'Open Repo', url: global.godszealRepo }, 
      { text: 'WaChannel', url: global.godszealWaChannel }
    ]
  ];

  Godszeal.reply(
    { image: { url: global.botPic }, caption: godszealMess, parse_mode: 'Markdown' },
    godszealButtons,
    m
  );
};

Godszeald.command = ['repo', 'sc', 'script'];
Godszeald.desc = 'Show Bot Repo';
Godszeald.category = ['general'];

module.exports = Godszeald;
