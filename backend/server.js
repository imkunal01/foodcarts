/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const distEntry = path.join(__dirname, 'dist', 'index.js');

const runBuildIfMissing = () => {
	if (fs.existsSync(distEntry)) return;

	console.log('Build output missing. Running `npm run build`...');
	const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
	const result = spawnSync(npmCmd, ['run', 'build'], {
		cwd: __dirname,
		stdio: 'inherit',
		shell: false
	});

	if (result.status !== 0) {
		console.error('Build failed. Cannot start server.');
		process.exit(result.status || 1);
	}

	if (!fs.existsSync(distEntry)) {
		console.error('Build completed but dist entry was not found.');
		process.exit(1);
	}
};

runBuildIfMissing();
require(distEntry);