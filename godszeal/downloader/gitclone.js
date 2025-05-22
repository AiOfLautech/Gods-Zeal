module.exports = {
    command: ['gitclone', 'gitdl', 'repodl', 'repoclone'],
    desc: 'Download repo github',
    category: ['downloader'],
    async run(m, { Godszeal, text }) {
        if (!text) return Godszeal.reply({ text: `Provide a public github repo link ie ${global.prefix}gitclone https://github.com/AiOfLautech/pages/apk` }, m)
		if (!text.includes('https://github.com')) return Godszeal.reply({ text: 'Invalid url-!' }, m)
            Godszeal.reply({ text: zealtechMess.wait }, m)
		let [, user, repo] = text.match(/(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i) || []
		try {
			Godszeal.downloadAndSend({ document: `https://api.github.com/repos/${user}/${repo}/zipball`, fileName: `${repo}.zip`, caption: zealtechMess.done }, m)
		} catch (e) {
			Godszeal.reply({ text: zealtechMess.error }, m)
		}
    }
}
