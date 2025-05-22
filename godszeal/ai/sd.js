let Godszeald = async (m, { Godszeal, text, fetchJson }) => {
    if (!text) {
        Godszeal.reply({ text: `Provide Some Text ie ${global.prefix}sd A Cute Cat` }, m);
        return;
    }
  
  Godszeal.reply({ text: zealtechMess.wait }, m);

    let godszealButtons = [
        [
            { text: 'Ai Web', url: `${global.godszealaichatWeb}/stable-diffusion` },
            { text: 'WaChannel', url: global.godszealWaChannel }
        ]
    ];

    try {
        Godszeal.downloadAndSend({ image: `${global.godszealApi}/ai/sd?apikey=${global.godszealKey}&prompt=${text}`, caption: giftechMess.done}, giftedButtons, m);
    } catch (error) {
        console.error('Error occurred while fetching AI data:', error);
        Godszeal.reply({ text: 'Stable Difussion is Unavailable Right Now.'}, godszealButtons, m);
    }
};

Godszeald.command = ['sd', 'stabledifussion'];
Godszeald.desc = 'Sd Image Generator';
Godszeald.category = ['ai'];

module.exports = Godszeald;
