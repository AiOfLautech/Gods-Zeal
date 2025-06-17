const fs = require('fs');
const path = require('path');
const axios = require('axios'); // If you use axios to download files

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

    const tempDir = '/opt/render/project/src/temp';
    try {
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        const godszealRes = await fetchJson(`${global.godszealApi}/ai/fluximg?apikey=${global.godszealKey}&prompt=${encodeURIComponent(text)}`);
        const imageUrl = godszealRes.result;

        // Download the image to a temp file if needed
        const fileName = `flux_${Date.now()}.jpg`;
        const filePath = path.join(tempDir, fileName);

        // Download image only if downloadAndSend expects a local file!
        const response = await axios.get(imageUrl, { responseType: 'stream' });
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        Godszeal.downloadAndSend({ image: filePath, caption: zealtechMess.done }, godszealButtons, m);

        // Optionally, delete the file after sending
        // fs.unlinkSync(filePath);

    } catch (error) {
        console.error('Error occurred while fetching AI data or sending image:', error);
        Godszeal.reply({ text: 'Flux is Unavailable Right Now.' }, godszealButtons, m);
    }
};

Godszeald.command = ['flux', 'fluximg'];
Godszeald.desc = 'Flux Image Generator';
Godszeald.category = ['ai'];

module.exports = Godszeald;
