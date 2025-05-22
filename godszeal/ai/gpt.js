let Godszeald = async (m, { Godszeal, text, fetchJson }) => {
    if (!text) {
        Godszeal.reply({ text: `Provide Some Text ie ${global.prefix}ai I Need Assistance.` }, m);
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
        const aiResponse = await fetchJson(`${global.godszealApi}/ai/gpt4?apikey=${global.godszealKey}&q=${text}`);
        const godszealResponse = aiResponse.result;

        Godszeal.reply( { text: godszealResponse}, godszealButtons, m);
    } catch (error) {
        console.error('Error occurred while fetching AI data:', error);
        Godszeal.reply( { text: 'Chat Gpt is Unavailable Right Now.'}, godszealButtons, m);
    }
};

Godszeald.command = ['gpt', 'ai', 'chatgpt'];
Godszeald.desc = 'Chat Gpt Ai Chat';
Godszeald.category = ['ai'];

module.exports = Godszeald;
