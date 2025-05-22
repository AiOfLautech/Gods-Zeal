module.exports = {
    command: ['hwaifu'],
    desc: 'Random h. waifu',
    category: ['nsfw'],
    settings: {
        private: true
    },
    async run(m, { Godszeal, fetchJson }) {
        Godszeal.reply({ text: zealtechMess.wait }, m)
	    const godszealRes = await fetchJson('https://api.waifu.pics/nsfw/waifu')
	    let godszealButtons = [
            [
                { text: '🔁', feature: 'hwaifu' },
            ]
        ]
        await Godszeal.reply({ image: godszealRes.url, caption: `Random Nsfw Waifu` }, godszealButtons, m)
    },
};
