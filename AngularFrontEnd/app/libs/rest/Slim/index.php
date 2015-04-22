<?php
include 'dbConfig.php';
require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();

$slim_app = new \Slim\Slim();

$slim_app->post('/doLogin','doLogin');
$slim_app->get('/isLogin','isLogin');
$slim_app->get('/logout','logout');
$slim_app->get('/loadUsers','loadUsers');
$slim_app->post('/newUser','newUser');
$slim_app->post('/editUser','editUser');
$slim_app->get('/loadEditUser/:eid','loadEditUser');
$slim_app->delete('/deleteUser/:did','deleteUser');


$slim_app->run();

function isLogin() {
	session_start();
	if(isset($_SESSION['username']) && !empty($_SESSION['username']))
		echo '{"isLogin": true}';
	else
		echo '{"isLogin": false}';
}
function logout() {
	session_start();
	session_destroy();
}

function doLogin() {
	$request = \Slim\Slim::getInstance()->request();
	$update = json_decode($request->getBody());	
	
	try {
		$db = getDB();		
		$stmt = $db->prepare("SELECT * FROM admin WHERE username=:username1 AND password=:password1");
		$stmt->bindValue(':username1', $update->username, PDO::PARAM_INT);
		$stmt->bindValue(':password1', $update->password, PDO::PARAM_STR);
		$stmt->execute();
		$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);		
		$db = null;
		
		if(count($rows)) {			
			session_start();
			$_SESSION['username'] =  $update->username;
			echo '{"status": "success"}';
		}
		else
			echo '{"status": "failed"}';
	} catch(PDOException $e) {	    
		echo '{"error":{"msg":'. $e->getMessage() .'}}'; 
	}
	
}

function loadUsers() {
	$sql = "SELECT uid as id,name,email, phone as mobile FROM customers_auth ORDER BY uid asc";
	try {
		$db = getDB();
		$stmt = $db->query($sql);  
		$users = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($users);
		
	} catch(PDOException $e) {
	    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function deleteUser($did) {   
	$sql = "DELETE FROM users WHERE id=:delete_id";
	try {
		$db = getDB();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("delete_id", $did);
		$stmt->execute();
		$db = null;
		//echo true;
		loadUsers();
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}	
}

function newUser() {
	$request = \Slim\Slim::getInstance()->request();
	$insert = json_decode($request->getBody());
	
	$sql = "INSERT INTO users (name, email, mobile) VALUES (:name, :email, :mobile)";
	try {
		$db = getDB();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("name", $insert->name);
		$stmt->bindParam("email", $insert->email);
		$stmt->bindParam("mobile", $insert->mobile);		
		$status = $stmt->execute();	
		$db = null;
		echo '{"status":'.$status.'}';
	} catch(PDOException $e) {		
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function loadEditUser($eid) {
	$sql = "SELECT id,name,email,mobile FROM users WHERE id=:id";
	try {		
		$db = getDB();		
		$stmt = $db->prepare($sql);
		$stmt->bindValue(':id', $eid);		
		$stmt->execute();
		$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);		
		$db = null;
		echo json_encode($rows);
	} catch(PDOException $e) {
	    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function editUser() {
	$request = \Slim\Slim::getInstance()->request();
	$update = json_decode($request->getBody());
	
	$sql = "UPDATE users SET name = :name, email = :email, mobile = :mobile WHERE id = :id";
	try {
		$db = getDB();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("name", $update->name);
		$stmt->bindParam("email", $update->email);
		$stmt->bindParam("mobile", $update->mobile);
		$stmt->bindParam("id", $update->id);		
		$status = $stmt->execute();	
		$db = null;
		echo '{"status":'.$status.'}';
	} catch(PDOException $e) {		
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}
?>