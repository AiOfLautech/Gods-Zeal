let Godszeald = async (m, { Godszeal, text, fetchJson }) => {
    if (!text) {
        Godszeal.reply({ text: `Provide Some Text ie ${global.prefix}flux A Cute Cat` }, m);
        return;
    }
  
  Godszeal.reply({ text: zealtechMess.wait }, m);

    let godszealButtons = [
        [
            { text: 'Ai Web', url: `${global.godszealaichatWeb}/ai` },
            { text: 'WaChannel', url: global.godszealWaChannel }
        ]
    ];

    try {
        const godszealRes = await fetchJson(`${global.godszealApi}/ai/fluximg?apikey=${global.godszealKey}&prompt=${text}`);
        Godszeal.downloadAndSend({ image: godszealRes.result, caption: zealtechMess.done}, godszealButtons, m);
    } catch (error) {
        console.error('Error occurred while fetching AI data:', error);
        Godszeal.reply({ text: 'Flux is Unavailable Right Now.'}, godszealButtons, m);
    }
};

Godszeald.command = ['flux', 'fluximg'];
Godszeald.desc = 'Flux Image Generator';
Godszeald.category = ['ai'];

module.exports = Godszeald;
