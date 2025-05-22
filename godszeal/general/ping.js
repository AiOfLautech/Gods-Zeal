let Godszeald = async (m, { Godszeal }) => {
  const startTime = Date.now(); 

  let godszealButtons = [
    [
      { text: 'WaChannel', url: global.godszealWaChannel }
    ]
  ];

  await new Promise(resolve => setTimeout(resolve, 100)); 

  const endTime = Date.now(); 
  const speed = endTime - startTime; 
  const godszealMess = `Pong: *${speed} ms*`;

  Godszeal.reply({ text: godszealMess, parse_mode: 'Markdown' }, godszealButtons, m);
};

Godszeald.command = ['ping', 'speed'];
Godszeald.desc = 'Show Bot Speed';
Godszeald.category = ['general'];

module.exports = Godszeald;
