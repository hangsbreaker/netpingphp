<?php
/*! Created By: Hangs Breaker */
function ping($host){
	if(strtoupper(substr(PHP_OS, 0, 3)) === 'WIN'){
		exec(sprintf('ping -w 1 -n 1 %s', escapeshellarg($host)), $res, $rval); // if using windows
	}else{
		exec(sprintf('ping -c 1 -W 1 %s', escapeshellarg($host)), $res, $rval); // if using linux
	}
   return $rval === 0;
}

function port($host,$port=80,$timeout=3){
	$fsock = @fsockopen($host, $port, $errno, $errstr, $timeout);
	if (!$fsock){
		return FALSE;
	}else{
		return TRUE;
	}
}

/* check if the host is up
   $host can also be an ip address */
	$i = $_POST['i'];
	$host = $_POST['host'].$i;
	$up = ping($host);
	if($up){$port = port($host);}else{$port = '';}
	echo $i.'|'.$host.'|'.($up ? 'on' : 'off').'|'.($port?'Port 80':'&nbsp;');
?>
