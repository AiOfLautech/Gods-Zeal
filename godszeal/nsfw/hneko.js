module.exports = {
    command: ['hneko'],
    desc: 'Random h. neko',
    category: ['nsfw'],
    settings: {
        private: true
    },
    async run(m, { Godszeal, fetchJson }) {
        Godszeal.reply({ text: zealtechMess.wait }, m)
	    const godszealRes = await fetchJson('https://api.waifu.pics/nsfw/neko')
	    let godszealButtons = [
            [
                { text: '🔁', feature: 'hneko' },
            ]
        ]
        await Godszeal.reply({ image: godszealRes.url, caption: `Random Nsfw Neko` }, godszealButtons, m)
    },
};
