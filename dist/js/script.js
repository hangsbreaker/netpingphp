/*! Created By: Hangs Breaker */
var tot = 0;
var lastot = 0;
var timer = null;
var host = '';

function _(id){
	return document.getElementById(id);
}

// Create view list machine
function list(){
    _('ping').innerHTML= '';
    _('total').innerHTML= '0';
    		
	var s =  _("ip").value.replace(/ /g , "");
	var d = s.split('-');
	var nip = s.split('.');
	
	if(nip[3] == '0/24'){
    	for(var i=1;i<=254;i++){
    		_('ping').innerHTML+= '<div class="comp"><div class="host" id="host'+i+'">'+nip[0]+'.'+nip[1]+'.'+nip[2]+'.'+i+'</div><div class="state off" id="state'+i+'">off</div><div class="port" id="port'+i+'">&nbsp;</div></div>';
    	}
		_('max').innerHTML=254;
	}else if(nip.length > 2){
		if(d.length == 2){
			var from = d[0].split('.');
			var to = d[1].split('.');
			host= from[0]+'.'+from[1]+'.'+from[2]+'.';
			for(var i=parseInt(from[3]);i<=parseInt(to[3]);i++){
				_('ping').innerHTML+= '<div class="comp"><div class="host" id="host'+i+'">'+host+i+'</div><div class="state off" id="state'+i+'">off</div><div class="port" id="port'+i+'">&nbsp;</div></div>';
			}
 			_('max').innerHTML=parseInt(to[3])-parseInt(from[3])+1;
		}else if(d.length == 1){
			_('ping').innerHTML+= '<div class="comp"><div class="host" id="host'+nip[3]+'">'+s+'</div><div class="state off" id="state'+nip[3]+'">off</div><div class="port" id="port'+nip[3]+'">&nbsp;</div></div>';
			_('max').innerHTML=1;
		}
	}
}

// Check ping komputer with php
function ping(h,i){
	$.post('ping.php', {host:h,i:i} ,function(data) {
		var d = data.split('|');
		if(d[2] == 'on'){_('state'+d[0]).className="state on";
			tot++;
			if(lastot <= tot){_('total').innerHTML=tot;}
		}else{
			if(_('state'+d[0]).innerHTML == "on"){
				lastot--;
				_('total').innerHTML=lastot;
				// Play sound
				 var bleep = new Audio();
				 bleep.src = "sound/elc.mp3";
				 bleep.play();
			}
			_('state'+d[0]).className="state off";
		}
		_('host'+d[0]).innerHTML=d[1];
		_('state'+d[0]).innerHTML=d[2];
		_('port'+d[0]).innerHTML=d[3];
	});
}

// Get status machine On or Off with looping calling ping function
function getStatus(){
	if(lastot != tot){lastot=tot;_('total').innerHTML=tot;}
	tot=0;
	var s =  _("ip").value.replace(/ /g , "");
	var d = s.split('-');
	var nip = s.split('.');
	
	
	if(nip[3] == '0/24'){
		host = nip[0]+'.'+nip[1]+'.'+nip[2]+'.';
    	for(var i=1;i<=254;i++){
			ping(host,i);
    	}
	}else{
		if(d.length == 2){
			var from = d[0].split('.');
			var to = d[1].split('.');
			host= from[0]+'.'+from[1]+'.'+from[2]+'.';
			for(var i=parseInt(from[3]);i<=parseInt(to[3]);i++){
				ping(host,i);
			}
		}else if(d.length == 1){
			host = nip[0]+'.'+nip[1]+'.'+nip[2]+'.';
			ping(host,nip[3]);
		}
	}
}

// Crete Timer Interval check every 30s
function startTime(){
    timer = setInterval(function () {
    	getStatus();
    }, 30000);
}
// Stoping Timer Interval
function stopTimer(){
    clearInterval(timer);
}

// Call function to process system
function run(){
	stopTimer();
	tot = 0;
	lastot = 0;
	timer = null;
	host = '';
	list();
	getStatus();
	startTime();
}

function keyhandler(event){
	var e = event.which || event.keyCode;
	if(e == 13){
		run();
	}
}
