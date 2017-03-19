<?php 
	header('Access-Control-Allow-Origin:*');
	$page = $_GET["page"];
	$data = file_get_contents('http://m.kugou.com/rank/info/?rankid=6666&page='.$page.'&json=true');
	echo $data;
?>