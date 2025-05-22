const { fetchJson, clockString, pickRandom, runtime, formatp, executeCommand } = require('../zeal');

module.exports = {
    async handleCases(m, { Gifted, text, command }) {
        try {
            switch (command) {
                    
                // case 1 ——————————————
   
                case 'thxto': {
                    let cap = `Special thanks to @AiOfLautech, my developer. This project is just Amazing!`
                    Godszeal.reply({ text: cap }, m)
                }
                break;
                
                // case 2 ——————————————
        
                case 'rate': {
                    let rate = Math.floor(Math.random() * 100)
            		Godszeal.reply({ text: `Bot Rate : *${rate}%*`, parse_mode: 'Markdown' }, m)
                }
                break;

                // case 3 ——————————————
                
                case 'web': {
            		Godszeal.reply({ text: 'Visit the Owner Website Here: https://godwin-hephzibah-tech.netlify.app' }, m)
                }
                break;
            }
        } catch (err) {
            console.log(err)
    	    Godszeal.reply({ text: `${err}`, parse_mode: 'Markdown' }, m)
    	}
    }
}
