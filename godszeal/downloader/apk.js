module.exports = {
    command: ['apk', 'apkdl', 'app'],
    desc: 'Download Android Apps',
    category: ['downloader'],
    async run(m, { Godszeal, text, GodszealApkDl }) {

        if (!text) return Godszeal.reply({ text: `Provide an App Name ie ${global.prefix}apk Facebook Lite` }, m);
        Godszeal.reply({ text: zealtechMess.wait }, m);

        try {
            if (typeof GodszealApkDl !== 'function') {
                return Godszeal.reply({ text: 'Internal error: APK downloader not available.' }, m);
            }
            const godszealAppData = await GodszealApkDl(text);
            if (!godszealAppData || !godszealAppData.link || !godszealAppData.appname) {
                return Godszeal.reply({ text: 'Failed to fetch app data.' }, m);
            }

            let godszealButtons = [
                [
                    { text: 'App Link', url: `${godszealAppData.link}` },
                    { text: 'WaChannel', url: global.godszealWaChannel }
                ]
            ];

            Godszeal.downloadAndSend({
                document: `${godszealAppData.link}`,
                fileName: `${godszealAppData.appname}`,
                mimetype: "application/vnd.android.package-archive",
                caption: zealtechMess.done
            }, godszealButtons, m);
        } catch (e) {
            console.error('Error:', e); 
            Godszeal.reply({ text: zealtechMess.error }, m);
        }
    }
};
