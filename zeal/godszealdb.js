require('../set');
const fs = require('fs');
const path = require('path');

class GodszealTechDB {
	godszealData = {}
	godszealFile = path.join(process.cwd(), 'zeal', 'godszeal-db.json');
	
	godszealRead = async () => {
		let godszealNigeria;
		if (fs.existsSync(this.godszealFile)) {
			godszealNigeria = JSON.parse(fs.readFileSync(this.godszealFile));
		} else {
			fs.writeFileSync(this.godszealFile, JSON.stringify(this.godszealData, null, 2));
			godszealNigeria = this.godszealData;
		}
		return godszealNigeria;
	}
	
	godszealWrite = async (godszealdevs) => {
		this.godszealData = !!godszealdevs ? godszealdevs : global.db;
		let aioflautechdevsDir = path.dirname(this.godszealFile);
		if (!fs.existsSync(aioflautechdevsDir)) fs.mkdirSync(aioflautechdevsDir, { recursive: true });
		fs.writeFileSync(this.godszealFile, JSON.stringify(this.godszealData, null, 2));
		return this.godszealFile;
	}
}

module.exports = { DataBase: GodszealTechDB };
