/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const distEntry = path.join(__dirname, 'dist', 'index.js');

if (!fs.existsSync(distEntry)) {
	console.error('Backend build not found. Run `npm run build` before `npm start`.');
	process.exit(1);
}

require(distEntry);