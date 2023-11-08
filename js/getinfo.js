function getHtml(result) {
    let data = JSON.stringify(result[0]);
    let html = `<section style="background-color: #eee;">
    <div class="container py-5">
        <div class="row">
        <div class="col-lg-4">
            <div class="card mb-4">
            <div class="card-body text-center">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                class="rounded-circle img-fluid" style="width: 150px;">
                <h5 class="my-3" id="nomep">${result[0]['nome']}</h5>
                <p class="text-muted mb-1" id="cursop">${result[0]['curso']}</p>
                <div class="d-flex justify-content-center mb-2">
                <button type="button" class="btn btn-primary" id="btnEdit" data-id='${data}'>Editar</button>
                <button type="button" class="btn btn-danger ms-1" id="logoutBtn" 
                <button 
                <?php 
                    if(isset($_POST['userid'])) {
                        session_destroy();
                        header('http://localhost:4000/project1/ui/login.php');
                        exit();
                    }
                ?>
                LogOut</button>
                </div>
            </div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="card mb-4">
            <div class="card-body">
                <div class="row">
                <div class="col-sm-3">
                    <p class="mb-0">Nome Completo</p>
                </div>
                <div class="col-sm-9">
                    <p class="text-muted mb-0" id="nomep">${result[0]['nome']}</p>
                </div>
                </div>
                <hr>
                <div class="row">
                <div class="col-sm-3">
                    <p class="mb-0">Email</p>
                </div>
                <div class="col-sm-9">
                    <p class="text-muted mb-0" id="emailp">${result[0]['email']}</p>
                </div>
                </div>
                <hr>
                <div class="row">
                <div class="col-sm-3">
                    <p class="mb-0">Telefone</p>
                </div>
                <div class="col-sm-9">
                    <p class="text-muted mb-0" id="telefonep">${result[0]['telefone']}</p>
                </div>
                </div>
                <hr>
                <div class="row">
                <div class="col-sm-3">
                    <p class="mb-0">CPF</p>
                </div>
                <div class="col-sm-9">
                    <p class="text-muted mb-0" id="cpfp">${result[0]['cpf']}</p>
                </div>
                </div>
                <hr>
                <div class="row">
                <div class="col-sm-3">
                    <p class="mb-0">Endereço</p>
                </div>
                <div class="col-sm-9">
                    <p class="text-muted mb-0" id="enderecop">${result[0]['endereço']}</p>
                </div>
                </div>
            </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </section>`;

    return html;
}

function getCursoNome(result) {
    let html = ``;
    html += `<option value="-1">Selecione um Curso</option>`;
    for(let i = 0; i < result.length; i++) {
        html += `<option value="${result[i].cursoid}">${result[i].curso}</option>`
    }

    return html;
}

function getAlunoByID(id) {
    $.ajax({
        url: "/project1/ajax/getinfoAJAX.php",
        type: "POST",
        dataType: "JSON",
        data: {
            id,
            action: "getalunoid"
        },
        beforeSend: function() {//alert("Making ajax call");
        },
        success: function(result) {
            let html = getHtml(result);
            $("#contentdiv").html(html);
        },
        error: function() {alert("Error1");}
    });
}

function getCursos() {
    $.ajax({
        url: "/project1/ajax/getalunosAJAX.php",
        type: "POST",
        dataType: "JSON",
        data: {
            action: "getcursos"
        },
        beforeSend: function() {//alert("Making ajax call");
        },
        success: function(result) {
            let html = getCursoNome(result);
            $("#ddcursos").html(html);
        },
        error: function() {alert("Error2");}
    });
}

function updateAluno(nome, idade, email, curso, semestre, end, cpf, telefone, alunoid) {
    $.ajax({
        url: "/project1/ajax/getinfoAJAX.php",
        type: "POST",
        dataType: "JSON",
        data: {
            nome,
            idade,
            email,
            curso,
            semestre,
            end,
            cpf,
            telefone,
            alunoid,
            action: "updatealuno"
        },
        beforeSend: function() {//alert("Making ajax call");
        },
        success: function(result) {
            let resp = JSON.stringify(result);
            if (resp == 0) {
                alert("Erro ao atualizar");
            } else {
                alert("Atualizado com sucesso");
                let html = getHtml(result);
                $("#contentdiv").html(html);
            }
        },
        error: function() {alert("Error4");}
    });
}

$(document).ready(function(){
    let id = $('#idfx').attr('value')
    alert(id);

    getAlunoByID(id);
    getCursos();

    /*$(document).on('click', '#logoutBtn', function(){
        window.location.href = 'http://localhost:4000/project1/ui/login.php';
    });*/

    $(document).on('click', '#btnEdit', function(){
        $("#flag").val("EDIT");
        $("#modalal").modal('toggle');
        let data = $(this).data('id');
        //alert(JSON.stringify(data));

        $("#alunoid").val(data['alunoid'])
        $("#txtnome").val(data['nome']);
        $("#txtidade").val(data['idade']);
        $("#txtemail").val(data['email']);
        $("#ddcursos").val(data['cursoid']);
        $("#ddsemestre").val(data['semestre']);
        $("#txtend").val(data['endereço']);
        $("#txtcpf").val(data['cpf']);
        $("#txttel").val(data['telefone']);
    });

    $(document).on('click', '#savebnt', function(){
        let nome = $("#txtnome").val();
        let idade = $("#txtidade").val();
        let email = $("#txtemail").val();
        let curso = $("#ddcursos").val();
        let semestre = $("#ddsemestre").val();
        let end = $("#txtend").val();
        let cpf = $("#txtcpf").unmask().val();
        let tel = $("#txttel").unmask().val();
        let alunoid = $("#alunoid").val();

        if (nome != '' && idade != '' && email != '' && curso >= 0 && semestre >= 0 && end != '' && cpf != '' && tel != '') {
            updateAluno(nome, idade, email, curso, semestre, end, cpf, tel, alunoid);
            $("#modalal").modal('hide');
        } else {
            alert("Invalid input");
        }
    });
});