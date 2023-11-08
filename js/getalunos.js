function getHtml(result) {
    let html = ``;
    html += `<div><button class="addnew btn btn-primary">ADICIONAR</button>`;
    html += `<button class="btn btn-danger btn-lg float-end" id="logoutBtn">SAIR</button></div>`;
    html += `<table class="table table-striped">`;

    for (let i = 0; i < result.length; i++) {
        if (i == 0) {
            html += `
                <thead>
                    <th>ID</th><th>Nome</th><th>Idade</th><th>Email</th>
                    <th>Curso</th><th>Semestre</th><th>Endereço</th><th></th>
                </thead> <tbody>`
            ;
        }

        let data = JSON.stringify(result[i]);

        html += `
            <tr>
                <td>${i+1}</td>
                <td>${result[i]['nome']}</td>
                <td>${result[i]['idade']}</td>
                <td>${result[i]['email']}</td>
                <td>${result[i]['curso']}</td>
                <td>${result[i]['semestre']}</td>
                <td>${result[i]['endereço']}</td>
                <td><button 
                    class="btn btn-primary btnEdit" 
                    data-id='${data}'
                >EDITAR</button></td>
                <td><button 
                    class="btn btn-danger btnDelete" 
                    data-id='${data}'
                >DELETAR</button></td>
            </tr>`
        ;
    }

    html += `</tbody></table>`;

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

function getAluno() {
    $.ajax({
        url: "/project1/ajax/getalunosAJAX.php",
        type: "POST",
        dataType: "JSON",
        data: {
            action: "getalunos"
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

function addAluno(nome, idade, email, curso, semestre, end, cpf, telefone) {
    $.ajax({
        url: "/project1/ajax/getalunosAJAX.php",
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
            action: "addaluno"
        },
        beforeSend: function() {//alert("Making ajax call");
        },
        success: function(result) {
            let resp = JSON.stringify(result);
            if (resp == 0) {
                alert("Erro ao inserir");
            } else {
                alert("Inserido com sucesso");
                let html = getHtml(result);
                $("#contentdiv").html(html);
            }
        },
        error: function() {alert("Error3");}
    });
}

function updateAluno(nome, idade, email, curso, semestre, end, cpf, telefone, alunoid) {
    $.ajax({
        url: "/project1/ajax/getalunosAJAX.php",
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

function removerAluno(alunoidx) {
    $.ajax({
        url: "/project1/ajax/getalunosAJAX.php",
        type: "POST",
        dataType: "JSON",
        data: {
            alunoid: alunoidx,
            action: "removealuno"
        },
        beforeSend: function() {//alert("Making ajax call");
        },
        success: function(result) {
            let resp = JSON.stringify(result);
            if (resp == 0) {
                alert("Erro ao remover");
            } else {
                alert("Removido com sucesso");
                let html = getHtml(result);
                $("#contentdiv").html(html);
            }
        },
        error: function() {alert("Error5");}
    });
}

$(document).ready(function(){
    // alert("Jquery loaded");
    $("#txtcpf").mask('000.000.000-00');
    $("#txttel").mask('(00) 0 0000-0009');

    getAluno();
    getCursos();

    $(document).on('click', '#logoutBtn', function(){
        window.location.href = 'http://localhost:4000/project1/ui/login.php';
    });

    $(document).on('click', '.addnew', function(){
        $("#modalal").modal('toggle');
        $("#flag").val("NEW");
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
            if($("#flag").val() == "NEW") {
                addAluno(nome, idade, email, curso, semestre, end, cpf, tel);
            } else {
                updateAluno(nome, idade, email, curso, semestre, end, cpf, tel, alunoid);
            }
            $("#modalal").modal('hide');
        } else {
            alert("Invalid input");
        }
    });

    $(document).on('click', '.btnEdit', function(){
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

    $(document).on('click', '.btnDelete', function(){
        let data = $(this).data('id');
        let resp = confirm("Deseja remover o aluno " + data['nome'] + "?");
        
        if (resp == true) {
            removerAluno(data['alunoid']);
        }
        //alert("Removendo Aluno " + data['alunoid']);
    });
});