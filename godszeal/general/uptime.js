let Godszeald = async (m, { Godszeal }) => {

    let godszealButtons = [[
          { text: 'WaChannel', url: global.godszealWaChannel }
      ]
  ];
  
  const uptimeSeconds = process.uptime();
  const days = Math.floor(uptimeSeconds / (24 * 3600));
  const hours = Math.floor((uptimeSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeSeconds % 60);
  
      let godszealMess = `Bot Has Been Up For: *${days}d ${hours}h ${minutes}m ${seconds}s*`;
  
  Godszeal.reply({ image: { url: global.botPic }, caption: godszealMess, parse_mode: 'Markdown' }, godszealButtons, m)
  }
  
  Godszeald.command = ['uptime', 'runtime']
  Godszeald.desc = 'Show Bot Uptime'
  Godszeald.category = ['general']
  
  module.exports = Godszeald
  
