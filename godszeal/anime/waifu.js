module.exports = {
    command: ['waifu', 'waifupic', 'waifupics'],
    desc: 'Random waifu',
    category: ['anime'],
    async run(m, { Godszeal, fetchJson }) {
        Godszeal.reply({ text: zealtechMess.wait }, m)
	    const godszealRes = await fetchJson('https://api.waifu.pics/sfw/waifu')
	    let godszealButtons = [
            [
                { text: '🔁', feature: 'waifu' },
            ]
        ]
        await Godszeal.reply({ image: godszealRes.url, caption: `Random Waifu` }, godszealButtons, m)
    },
};
