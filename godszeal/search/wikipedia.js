const axios = require('axios'),
      cheerio = require('cheerio');

let Godszeald = async (m, { Godszeal, text }) => {
    if (!text) return Godszeal.reply({ text: `Provide some Search Query ie ${prefix}wiki Cat` }, m)
        Godszeal.reply({ text: zealtechMess.wait }, m)
    const godszealWiki = await godszealWikipedia(text)
    let godszealCap = 
`*${godszealWiki.title}*

"${godszealWiki.desc}"`

 let godszealButtons = [[
          { text: 'WaChannel', url: global.godszealWaChannel }
      ]
  ];
      
Godszeal.reply({ text: godszealCap, parse_mode: 'Markdown' }, godszealButtons, m)
}

Godszeald.command = ['wikipedia', 'wiki', 'wikimedia']
Godszeald.desc = 'Search for info on Wikipedia'
Godszeald.category = ['search']

module.exports = Godszeald

async function godszealWikipedia(query) {
    try {
        const q = query.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('_')
        
        const { data } = await axios.get(`https://en.m.wikipedia.org/wiki/${q}`)
        const $ = cheerio.load(data)
        
        const result = {
            title: $('h1[id="firstHeading"]').text().trim(),
            desc: $('.mf-section-0 p').text().trim().replace(/\[.*?\]/g, '')
        }
        return result;
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        return error.message;
    }
}
