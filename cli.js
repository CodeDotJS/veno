#!/usr/bin/env node

'use strict';

const dns = require('dns');
const got = require('got');
const chalk = require('chalk');
const logUpdate = require('log-update');
const ora = require('ora');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({pkg}).notify();

const spinner = ora();

const url = 'https://nodejs.org/dist/latest/SHASUMS256.txt';

dns.lookup('nodejs.org', err => {
	if (err) {
		logUpdate(`\n You're Offline! \n`);
		process.exit(1);
	} else {
		logUpdate();
		spinner.text = chalk.keyword('yellow')('Comparing');
		spinner.start();
		got(url).then(res => {
			const currentVersion = process.versions.node;
			const latestVersion = res.body.split('-v')[1].split('-')[0];
			logUpdate(`\n ⚡ Installed Version : ${chalk.green(`v${currentVersion}`)} \n\n ⚡ Lastest Version   : ${chalk.green(`v${latestVersion}`)} \n`);
			spinner.stop();
		});
	}
});
