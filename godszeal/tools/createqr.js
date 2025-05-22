let Godszeald = async (m, { Godszeal, text, fetchJson }) => {
    if (!text) {
        Godszeal.reply({ text: `Provide Some Text ie ${global.prefix}qr text/link` }, m);
        return;
    }
  
  Godszeal.reply({ text: zealtechMess.wait }, m);

    let godszealButtons = [
        [
            { text: 'WaChannel', url: global.godszealWaChannel }
        ]
    ];

    try {
        Godszeal.downloadAndSend({ image: `${global.zealApi}/gqr?&text=${text}`, caption: zealtechMess.done}, godszealButtons, m);
    } catch (error) {
        console.error('Error occurred while fetching AI data:', error);
        Godszeal.reply({ text: 'Api is Unavailable Right Now.'}, godszealButtons, m);
    }
};

Godszeald.command = ['createqr', 'qr'];
Godszeald.desc = 'Qr Generator';
Godszeald.category = ['tools'];

module.exports = Godszeald;
