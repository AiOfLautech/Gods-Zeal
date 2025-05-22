const axios = require("axios");

module.exports = {
    command: ['ytmp3'],
    desc: 'Download Audio from Youtube',
    category: ['downloader'],
    async run(m, { Godszeal, text }) {

        if (!text) return Godszeal.reply({ text: `Usage: ${global.prefix}ytmp3 https://youtu.be/60ItHLz5WEA?feature=shared` }, m);

        Godszeal.reply({ text: zealtechMess.wait }, m);

        try {
            const videoUrl = Array.isArray(text) ? text.join(" ") : text;
            if (!videoUrl.startsWith("https://youtu")) return Godszeal.reply({ text: 'Please Provide a Valid YouTube Link' }, m);

            try {
                const apiResponse = await axios.get(`${global.godszealApi}/download/dlmp3?apikey=${global.godszealKey}&url=${videoUrl}`);
                const downloadUrl = apiResponse.data.result.download_url;
                const fileName = apiResponse.data.result.title;

                if (!downloadUrl) {
                    return Godszeal.reply({ text: 'Failed to retrieve download link.' }, m);
                }

                 let godszealButtons = [
                [
                    { text: 'Ytdl Web', url: `${global.ytdlWeb}` },
                    { text: 'WaChannel', url: global.godszealWaChannel }
                ]
            ];

                const searchResponse = await axios.get(`${global.godszealApi}/search/yts?apikey=${global.godszealKey}&query=${videoUrl}`);
                const video = searchResponse.data.results[0];

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

                await Godszeal.reply({ image: { url: video.thumbnail }, caption: godszealMess, parse_mode: 'Markdown' }, godszealButtons, m);

                Godszeal.downloadAndSend({ audio: downloadUrl, fileName: fileName, caption: zealtechMess.done }, godszealButtons, m);
            } catch (e) {
                console.error('API Error:', e);
                return Godszeal.reply({ text: 'Failed to fetch download link from API.' }, godszealButtons, m);
            }
        } catch (e) {
            console.error('Error:', e);
            return Godszeal.reply({ text: zealtechMess.error }, m);
        }
    }
};
