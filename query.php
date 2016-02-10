<?php	
	/*Get SQL Data*/
	function get_data($query, $params){
		$data = array();
		if(isset($query)){
			//Build Query
			$sql = build_query($query, $params);
			//Connect to database and get results	
			$db = Database::getInstance();
			$mysqli = $db->getConnection();
			$result = $mysqli->query($sql);
			
			//get results
			if ($result->num_rows > 0) {							foreach ($result as $key => $val) {					$data[$key] = $val;									}
			}
			else{
				$data = null;
			}	
		}				//print_r($data);
		return $data;
	}
	
	/*SQL Ingection Sanitisation*/
	function sanitize(){
		return trim(preg_replace('/[^-a-zA-Z0-9_]/', ' ', $_GET['q']));
	}
	
	/*build query*/
	function build_query($query, $params){		
		$sql = 'SELECT * FROM ' . $params['table'];		//print_r($sql);		
		return $sql;
	}
?>
