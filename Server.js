#!/usr/bin/env node
var speedTest=require('speedtest-net');
var ProgressBar = require('progress');

var test=speedTest({maxTime:5000});

var downloadBar = new ProgressBar('Checking Download speed [:bar] :percent :etas', {
	complete: '=',
	incomplete: ' ',
	width: 20,
	total: 100
});

var uploadBar = new ProgressBar('Checking Upload speed [:bar] :percent :etas', {
	complete: '=',
	incomplete: ' ',
	width: 20,
	total: 100
});

var pingBar =  new ProgressBar('Ping [:bar] :percent :etas', {
	complete: '=',
	incomplete: ' ',
	width: 20,
	total: 100
});

  test.on('downloadprogress',function(p){	  
		downloadBar.tick(p)
  });

  test.on('uploadprogress',function(u){
		uploadBar.tick(u);
  });
  
  test.once('servers',function(s){
     console.log("Found ",s.length," Servers");
  });

  test.once('bestservers',function(b){    
    console.log("Found ",b.length," Best Servers");
  });

  test.on('testserver',function(s){
	  pingBar.tick(s)
	console.log("Pinging "+s);
  });

  test.once('downloadspeed',function(s){
	console.log("Your download speed is"+(s/1000).toFixed(2));
  });

  test.once('uploadspeed',function(u){
       console.log("Your upload speed is"+(u/1000).toFixed(2));
  });

  test.once('data',function(data){	  
    console.log("Download and Upload :\n");
    console.log(data.speeds.download);
    console.log(data.speeds.upload);
  });
  
  test.once('error',function(err){
    console.error(err);
  });
