module.exports = {
    command: ['neko', 'nekopic', 'nekopics'],
    desc: 'Random neko',
    category: ['anime'],
    async run(m, { Godszeal, fetchJson }) {
        Godszeal.reply({ text: zealtechMess.wait }, m)
	    const godszealRes = await fetchJson('https://api.waifu.pics/sfw/neko')
	    let godszealButtons = [
            [
                { text: '🔁', feature: 'neko' },
            ]
        ]
        await Godszeal.reply({ image: godszealRes.url, caption: `Random Neko` }, godszealButtons, m)
    },
};
