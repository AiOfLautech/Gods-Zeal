const fs = require('fs');
const axios = require('axios');
const chalk = require('chalk');
const { sizeFormatter } = require('human-readable');
const { exec } = require('child_process');

function godszealMonospace(input) {
    const godszealBoldz = {
         'A': '𝙰', 'B': '𝙱', 'C': '𝙲', 'D': '𝙳', 'E': '𝙴', 'F': '𝙵', 'G': '𝙶',
        'H': '𝙷', 'I': '𝙸', 'J': '𝙹', 'K': '𝙺', 'L': '𝙻', 'M': '𝙼', 'N': '𝙽',
        'O': '𝙾', 'P': '𝙿', 'Q': '𝚀', 'R': '𝚁', 'S': '𝚂', 'T': '𝚃', 'U': '𝚄',
        'V': '𝚅', 'W': '𝚆', 'X': '𝚇', 'Y': '𝚈', 'Z': '𝚉',
        '0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒', '5': '𝟓', '6': '𝟔',
        '7': '𝟕', '8': '𝟖', '9': '𝟗',
        ' ': ' ' 
    };
    return input.split('').map(char => godszealBoldz[char] || char).join('');
}

async function GodszealApkDl(appName) {
    try {
      const godszealResponse = await axios.get("http://ws75.aptoide.com/api/7/apps/search", {
        params: {
          query: appName,
          limit: 1
        }
      });
      const appDetails = godszealResponse.data.datalist.list[0];
      return {
        img: appDetails.icon,
        developer: appDetails.store.name,
        appname: appDetails.name,
        link: appDetails.file.path 
      };
    } catch (error) {
      console.error("Error fetching app information:", error);
      throw error;
    }
}

const godszealFetchJson = async (url, options) => {
    try {
        options ? options : {}
        const godszealRes = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return godszealRes.data
    } catch (err) {
        return err
    }
}

const godszealGetBuffer = async(url, options) => {
	try {
		options ? options : {}
		var godszealRes = await axios({
			method: 'get',
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return godszealRes.data
	} catch (e) {
		console.log(e)
	}
}

const godszealClockString = (ms) => {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function godszealPickRandom(list) {
	return list[Math.floor(list.length * Math.random())]
}

const godszealRuntime = function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

const godszealFormatp = sizeFormatter({
    std: 'JEDEC', 
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})

async function godszealExecuteCommand(command){
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            if (stderr) {
                reject(new Error(stderr));
            }
            resolve(stdout);
        });
    });
}

module.exports = { 
    fetchJson: godszealFetchJson, 
    clockString: godszealClockString, 
    pickRandom: godszealPickRandom, 
    runtime: godszealRuntime, 
    formatp: godszealFormatp, 
    executeCommand: godszealExecuteCommand, 
    monospace: godszealMonospace, 
    GiftedApkDl: GodszealApkDl, 
    getBuffer: godszealGetBuffer 
};
