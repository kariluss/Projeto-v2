<?php
    require_once "database.php";

    class UsuariosDB {
        public function getAllUsuarios($dbo) {
            $cmd = "SELECT
                us.id AS userid,
                us.nome AS nome,
                us.email AS email,
                us.senha AS senha
            FROM
                usuários AS us
            ";

            $stm = $dbo -> conn -> prepare($cmd);
            $stm -> execute();
            $rv = $stm -> fetchAll(PDO::FETCH_ASSOC);
            return ($rv);
        }

        public function getUsuario($dbo, $email, $pass) {
            $cmd = "SELECT
                us.id AS userid,
                us.nome AS nome,
                us.email AS email,
                us.senha AS senha
            FROM
                usuários AS us
            WHERE
                us.email = :email
            AND
                us.senha = :senha";

            $stm = $dbo -> conn -> prepare($cmd);
            
            $stm -> execute([
                ":email" => $email,
                ":senha" => $pass
            ]);

            $rv = $stm -> fetchAll(PDO::FETCH_ASSOC);
            return ($rv);
        }
    }
?>