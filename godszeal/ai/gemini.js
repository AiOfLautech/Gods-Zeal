const fs = require('fs');

let Godszeald = async (m, { Godszeal, text, fetchJson }) => {
    if (!text) {
        Godszeal.reply({ text: `Provide Some Text ie ${global.prefix}flux A Cute Cat` }, m);
        return;
    }

    Godszeal.reply({ text: zealtechMess.wait }, m);

    // Path to temp directory
    const tempDir = '/opt/render/project/src/temp';

    try {
        // Ensure temp directory exists
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        const godszealRes = await fetchJson(`${global.godszealApi}/ai/fluximg?apikey=${global.godszealKey}&prompt=${encodeURIComponent(text)}`);
        Godszeal.downloadAndSend(
            { image: godszealRes.result, caption: zealtechMess.done },
            m
        );
    } catch (error) {
        console.error('Error occurred while fetching AI data or sending image:', error);
        Godszeal.reply({ text: 'Flux is Unavailable Right Now.' }, m);
    }
};

Godszeald.command = ['flux', 'fluximg'];
Godszeald.desc = 'Flux Image Generator';
Godszeald.category = ['ai'];

module.exports = Godszeald;
