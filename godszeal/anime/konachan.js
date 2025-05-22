const axios = require('axios'),
      cheerio = require('cheerio');

async function godszealKonachan() {
    try {
        let { godszealData } = await axios.get('https://konachan.net/post?tags=order%3Arandom')
        let $ = cheerio.load(godszealData)
        let img = []
        $('#post-list-posts a.directlink.largeimg').each((index, element) => {
            const gtw = $(element).attr('href')
            img.push(gtw)
        })
        let imgg = img[Math.floor(Math.random() * img.length)]
        return imgg
    } catch (error) {
        console.error(error)
        return error.message
    }
}

module.exports = {
    command: ['konachan'],
    desc: 'Random konachan',
    category: ['anime'],
    async run(m, { Godszeal }) {
        try {
            Godszeal.reply({ text: zealtechMess.wait }, m)
            let giftedButtons = [
                [
                    { text: '🔁', feature: 'konachan' },
                ]
            ]
            await Godszeal.reply({ image: await godszealKonachan(), caption: `Random Konachan` }, godszealButtons, m)
        } catch (err) {
            console.log(err)
            Godszeal.reply({ text: zealtechMess.error }, m)
        }
    },
};
