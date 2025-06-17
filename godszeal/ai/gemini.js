let Godszeald = async (m, { Godszeal, text, fetchJson }) => {
    if (!text) {
        Godszeal.reply({ text: `Provide Some Text ie ${global.prefix}gemini I Need Assistance.` }, m);
        return;
    }

    Godszeal.reply({ text: zealtechMess.wait }, m);

    // Button definitions (unused if reply doesn't support them)
    // let godszealButtons = [
    //     [
    //         { text: 'Ai Web', url: `${global.godszealaichatWeb}/ai` },
    //         { text: 'WaChannel', url: global.godszealWaChannel }
    //     ]
    // ];

    try {
        const aiResponse = await fetchJson(`${global.godszealApi}/ai/geminiai?apikey=${global.godszealKey}&q=${text}`);
        const godszealResponse = aiResponse.result;

        Godszeal.reply({ text: godszealResponse }, m);
    } catch (error) {
        console.error('Error occurred while fetching AI data:', error);
        Godszeal.reply({ text: 'Gemini Ai is Unavailable Right Now.' }, m);
    }
};

Godszeald.command = ['gemini', 'geminiai'];
Godszeald.desc = 'Gemini Ai Chat';
Godszeald.category = ['ai'];

module.exports = Godszeald;
