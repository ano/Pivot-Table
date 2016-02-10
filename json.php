<?php

	/*
		Author: Ano Tisam
		Email: an0tis@gmail.com
		Website: http://www.whupi.com
		Description: JSON feed for Korero Open Dictionary front-end search
		LICENSE: Free for personal and commercial use licensed under the Creative Commons Attribution 3.0 License, which means you can:

					Use them for personal stuff
					Use them for commercial stuff
					Change them however you like

				... all for free, yo. In exchange, just give the AUthor credit for the program and tell your friends about it :)
	*/
	// Initialize Session data
	if (session_id() == "") session_start(); 
	
	// Turn on output buffering
	ob_start(); 
	
	include_once "../inventory/ewcfg10.php";
	include_once "../inventory/ewmysql10.php";
	include_once "db.php";
	include_once "query.php";
  
    $json                   = array();
    
    $json["dimensions"]     = array("Year" => "Year", "ID" => "ID");
	
	$params['table'] 		= 'inventory_transaction_report';				//SQL Table Name
	$params['limit'] 		= 60;						//SQL Limit	
	$query 					= "inventory_transaction_report";	
	$data 					= get_data($query, $params);
    
    $json["rows"]           = $data;


	
	/*Output as JSON*/
	header('Content-Type: application/json');
	echo(json_encode($json));	

?>