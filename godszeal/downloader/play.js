const axios = require("axios");
const yts = require("yt-search");

module.exports = {
    command: ['play', 'song', 'audio'],
    desc: 'Download Audio from Youtube',
    category: ['downloader'],
    async run(m, { Godszeal, text }) {
        let godszealButtons = [
            [
                { text: 'Ytdl Web', url: `${global.ytdlWeb}` },
                { text: 'WaChannel', url: global.godszealWaChannel }
            ]
        ];

        if (!text) return Godszeal.reply({ text: `Usage: ${global.prefix}play Faded` }, m);

        Godszeal.reply({ text: zealtechMess.wait }, m);

        try {
            const searchTerm = Array.isArray(text) ? text.join(" ") : text;
            const searchResults = await yts(searchTerm);

            if (!searchResults.videos.length) {
                return Godszeal.reply({ text: 'No video found for your query.' }, m);
            }

            const video = searchResults.videos[0];
            const videoUrl = video.url;

            try {
                const apiResponse = await axios.get(
                    `${global.godszealApi}/download/dlmp3?apikey=${global.godszealKey}&url=${videoUrl}`
                );
                const downloadUrl = apiResponse.data.result.download_url;
                const fileName = apiResponse.data.result.title;

                if (!downloadUrl) {
                    return Godszeal.reply({ text: 'Failed to retrieve download link.' }, m);
                }

                let godszealMess = `
${global.botName} SONG DOWNLOADER 
╭───────────────◆  
│⿻ *Title:* ${video.title}
│⿻ *Quality:* mp3 (128kbps)
│⿻ *Duration:* ${video.timestamp}
│⿻ *Viewers:* ${video.views}
│⿻ *Uploaded:* ${video.ago}
│⿻ *Artist:* ${video.author.name}
╰────────────────◆  
⦿ *Direct Yt Link:* ${video.url}
⦿ *Download More At:* ${global.ytdlWeb}

╭────────────────◆  
│ ${global.footer}
╰─────────────────◆`;

                await Godszeal.reply({
                    image: { url: video.thumbnail },
                    caption: godszealMess,
                    parse_mode: 'Markdown'
                }, godszealButtons, m);

                Godszeal.downloadAndSend({
                    audio: downloadUrl,
                    fileName: fileName,
                    caption: zealtechMess.done
                }, godszealButtons, m);
            } catch (e) {
                console.error('API Error:', e);
                return Godszeal.reply({ text: 'Failed to fetch download link from API.' }, godszealButtons, m);
            }
        } catch (e) {
            console.error('Error:', e);
            return Godszeal.reply({ text: zealtechMess.error }, godszealButtons, m);
        }
    }
};
