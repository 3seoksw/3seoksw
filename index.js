const Mustache = require('mustache') 
const fs = require('fs') 
const MUSTACHE_MAIN_DIR = './main.mustache' 

let DATA = {
	name: 'WooSeok',
	date: new Date().toLocaleDateString('en-GB', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		timeZoneName: 'short',
		timeZone: 'UTC',
	})
}

function generateReadMe() {
	fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
		if (err) throw err
		const output = Mustache.render(data.toString(), DATA)
		fs.writeFileSync('README.md', output)
	})
}

generateReadMe()
