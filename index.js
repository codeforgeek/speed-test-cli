#!/usr/bin/env node
var speedTest=require('speedtest-net');
var ProgressBar = require('progress');
var chalk = require("chalk");

var test=speedTest({maxTime:5000});

var bar,pingTime;

function prog(what,pct){
	if (pct>=100){
		if (bar) bar.terminate();
		bar=null;
		return;
	}

	if (!bar) {
		var green = '\u001b[42m \u001b[0m',
			red = '\u001b[41m \u001b[0m';

		bar = new ProgressBar(' '+what+' [:bar] :percent', {
			complete: green,
			incomplete: red,
			clear: true,
			width:40,
			total: 100
		});
	}

	bar.update(pct/100);
}

test.on('testserver',function(server) {
	pingTime = server.bestPing;
});

test.on('downloadprogress',function(pct){
	prog('Checking Download Speed ',pct);
});

test.on('uploadprogress',function(pct){
	prog('Checking Upload Speed ',pct);
});

test.on('data',function(data){
	console.log(chalk.cyan("Ping : "),Math.abs(pingTime),chalk.dim('ms'));
	console.log(chalk.cyan("Download Speed : ") + data.speeds.download + chalk.dim(" Mbps"));
    console.log(chalk.cyan("Upload Speed : ") + data.speeds.upload + chalk.dim(" mbps"));
});

test.on('error',function(error){
	process.exit(1);
});
