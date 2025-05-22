let Godszeald = async (m, { Godszeal, text, fetchJson }) => {
    if (!text) {
        Godszeal.reply({ text: `Provide Some Text ie ${global.prefix}luminai I Need Assistance.` }, m);
        return;
    }

    Godszeal.reply({ text: zealtechMess.wait }, m);

    let giftedButtons = [
        [
            { text: 'Ai Web', url: `${global.godszealaichatWeb}/ai` },
            { text: 'WaChannel', url: global.godszealWaChannel }
        ]
    ];

    try {
        const aiResponse = await fetchJson(`${global.godszealApi}/ai/luminai?apikey=${global.godszealKey}&query=${text}`);
        const godszealResponse = aiResponse.result;

        Godszeal.reply( { text: godszeealResponse}, godszealButtons, m);
    } catch (error) {
        console.error('Error occurred while fetching AI data:', error);
        Gifted.reply( { text: 'Lumin Ai is Unavailable Right Now.'}, godszealButtons, m);
    }
};

Godszeald.command = ['luminai', 'lumin'];
Godszeald.desc = 'Lumin Ai Chat';
Godszeald.category = ['ai'];

module.exports = Godszeald;
