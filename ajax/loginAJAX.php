<?php
    //action: "getalunos"
    $root = $_SERVER["DOCUMENT_ROOT"];
    include_once $root."/project1/database/database.php";
    include_once $root."/project1/database/AlunosDB.php";
    include_once $root."/project1/database/CursosDB.php";
    include_once $root."/project1/database/UsuariosDB.php";

    $action = $_POST["action"];
    $dbo = new Database();

    if($action == "getuser"){
        $ado = new UsuariosDB();

        $email = $_POST["email"];
        $password = $_POST["password"];

        $result = $ado -> getUsuario($dbo, $email, $password);
        $rv = json_encode($result);
        echo($rv);
        exit();
    } 
?>