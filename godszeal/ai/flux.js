const fs = require('fs');
const path = require('path');
const axios = require('axios');

let Godszeald = async (m, { Godszeal, text, fetchJson }) => {
    if (!text) {
        Godszeal.reply({ text: `Provide Some Text ie ${global.prefix}flux A Cute Cat` }, m);
        return;
    }

    Godszeal.reply({ text: zealtechMess.wait }, m);

    // Only include buttons with valid URLs
    let godszealButtons = [[]];
    if (global.godszealaichatWeb && /^https?:\/\//.test(global.godszealaichatWeb)) {
        godszealButtons[0].push({ text: 'Ai Web', url: `${global.godszealaichatWeb}/ai` });
    }
    if (global.godszealWaChannel && /^https?:\/\//.test(global.godszealWaChannel)) {
        godszealButtons[0].push({ text: 'WaChannel', url: global.godszealWaChannel });
    }
    // If both were invalid, remove the empty array
    if (godszealButtons[0].length === 0) godszealButtons = undefined;

    const tempDir = '/opt/render/project/src/temp';
    try {
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

        const apiUrl = `${global.godszealApi}/ai/fluximg?apikey=${global.godszealKey}&prompt=${encodeURIComponent(text)}`;
        const godszealRes = await fetchJson(apiUrl);

        // Check for valid result URL
        const imageUrl = godszealRes && godszealRes.result && /^https?:\/\//.test(godszealRes.result) ? godszealRes.result : null;
        if (!imageUrl) {
            Godszeal.reply({ text: 'Failed to generate image. Please try again later.' }, m);
            return;
        }

        // Download the image
        const fileName = `flux_${Date.now()}.jpg`;
        const filePath = path.join(tempDir, fileName);
        const response = await axios.get(imageUrl, { responseType: 'stream' });
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);
        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        // Only include buttons if valid
        if (godszealButtons) {
            Godszeal.downloadAndSend({ image: filePath, caption: zealtechMess.done }, godszealButtons, m);
        } else {
            Godszeal.downloadAndSend({ image: filePath, caption: zealtechMess.done }, m);
        }
        // Optionally, clean up file after sending
        // fs.unlinkSync(filePath);

    } catch (error) {
        console.error('Error occurred while fetching AI data or sending image:', error);
        // Only include buttons if valid
        if (godszealButtons) {
            Godszeal.reply({ text: 'Flux is Unavailable Right Now.' }, godszealButtons, m);
        } else {
            Godszeal.reply({ text: 'Flux is Unavailable Right Now.' }, m);
        }
    }
};

Godszeald.command = ['flux', 'fluximg'];
Godszeald.desc = 'Flux Image Generator';
Godszeald.category = ['ai'];

module.exports = Godszeald;
