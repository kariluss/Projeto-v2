<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alunos, Ficha Técnica</title>
    
    <script src="/project1/global/jquery.js"></script>
    <script src="/project1/js/login.js"></script>
    <script src="/project1/global/js/bootstrap.bundle.min.js"></script>
    <script src="/project1/global/jquery_redirect.js"></script>
    
    <link rel="stylesheet" href="/project1/global/css/bootstrap.min.css">
    <link rel="stylesheet" href="/project1/css/login.css">
</head>
<body>
    <main>
        <div class="heading">
            Login
        </div>
        <div id="contentdiv" class="border test1">
            <form method="post">
                <!-- Email input -->
                <div class="form-outline mb-4">
                    <label class="form-label" for="email-input">Email:</label>
                    <input type="email" id="email-input" class="form-control" />
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4"> 
                    <label class="form-label" for="password-input">Senha:</label>
                    <input type="password" id="password-input" class="form-control" />
                </div>

                <!-- Submit button -->
                <button type="button" class="btn btn-primary btn-block mb-4" id="login-btn">Entrar</button>
                <span id="warn-user"></span>
            </form>
        </div>
        <hidden id="flag">
    </main>
</body>
</html>