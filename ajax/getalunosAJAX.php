<?php
    //action: "getalunos"
    $root = $_SERVER["DOCUMENT_ROOT"];
    include_once $root."/project1/database/database.php";
    include_once $root."/project1/database/AlunosDB.php";
    include_once $root."/project1/database/CursosDB.php";

    $action = $_POST["action"];
    $dbo = new Database();

    if($action == "getalunos"){
        $ado = new AlunosDB();

        $result = $ado -> getAllAlunos($dbo);
        $rv = json_encode($result);
        echo($rv);
        exit();
    } 
    
    if($action == "getcursos") {
        $cdo = new CursosDB();

        $result = $cdo -> getAllCursos($dbo);
        $rv = json_encode($result);
        echo($rv);
        exit();
    } 
    
    if($action == "addaluno") {
        $ado = new AlunosDB();

        $nome = $_POST["nome"];
        $idade = $_POST["idade"];
        $email = $_POST["email"];
        $curso = $_POST["curso"];
        $semestre = $_POST["semestre"];
        $endereco = $_POST["endereco"];
        $cpf = $_POST["cpf"];
        $telefone = $_POST["telefone"];

        $result = $ado -> createNewAluno($dbo, $nome, $idade, $email, $semestre, $endereco, $curso, $cpf, $telefone);

        if ($result == 1) {
            $result = $ado -> getAllAlunos($dbo); //retorna todos os alunos com o recém inserido
        }

        $rv = json_encode($result);
        echo($rv);
        exit();
    } 
    
    if($action == "updatealuno") {
        $ado = new AlunosDB();

        $nome = $_POST["nome"];
        $idade = $_POST["idade"];
        $email = $_POST["email"];
        $curso = $_POST["curso"];
        $semestre = $_POST["semestre"];
        $endereco = $_POST["end"];
        $cpf = $_POST["cpf"];
        $telefone = $_POST["telefone"];
        $alunoid = $_POST["alunoid"];

        $result = $ado -> updateAluno($dbo, $alunoid, $nome, $idade, $email, $semestre, $endereco, $curso, $cpf, $telefone);

        if ($result == 1) {
            $result = $ado -> getAllAlunos($dbo); //retorna todos os alunos com o recém inserido
        }

        $rv = json_encode($result);
        echo($rv);
        exit();
    }

    if($action == "removealuno") {
        $ado = new AlunosDB();

        $alunoid = $_POST["alunoid"];

        $result = $ado -> removeAluno($dbo, $alunoid);

        if ($result == 1) {
            $result = $ado -> getAllAlunos($dbo); //retorna todos os alunos com o recém inserido
        }

        $rv = json_encode($result);
        echo($rv);
        exit();
    }

    
?>