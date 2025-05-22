const fetch = require('node-fetch');

module.exports = {
    command: ['pastebin', 'getpb'],
    desc: 'Copy content from pastebin',
    category: ['tools'],
    async run(m, { Godszeal, text }) {
        if (!text) return Godszeal.reply({ text: `Provide a Pastebin Link ie ${global.prefix}pastebin https://pastebin.com/rkbj0rVu` }, m)
        if (!/^https:\/\/pastebin\.com\/[a-zA-Z0-9]+$/.test(text)) return Godszeal.reply({ text: 'Invalid url' }, m)
            Godszeal.reply({ text: zealtechMess.wait }, m)
        const pasteId = text.split('/').pop(); 
        try {
            const response = await fetch(`https://pastebin.com/raw/${pasteId}`);
            if (!response.ok) return Godszeal.reply({ text: 'Failed to fetch content from Pastebin.' }, m);
            const content = await response.text();
            if (!content) return Godszeal.reply({ text: 'No content found on Pastebin!' }, m);
            Godszeal.reply({ text: `\`\`\`\n${content}\n\`\`\``, parse_mode: 'Markdown' }, m);
        } catch (e) {
            console.log(e)
            Godszeal.reply({ text: zealtechMess.error }, m)
        }
    }
}
