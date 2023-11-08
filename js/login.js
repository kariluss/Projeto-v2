function getUser(email, password) {
    $.ajax({
        url: "/project1/ajax/loginAJAX.php",
        type: "POST",
        dataType: "JSON",
        data: {
            email,
            password,
            action: "getuser"
        },
        beforeSend: function() {//alert("Making ajax call");
        },
        success: function(result) {
            let data = result[0].userid;
            if (data == 0) {
                redirectToAlunos(result[0]);
            } else {
                //alert(data);
                redirectToInfo(result[0]);
            }
        },
        error: function() {alert("Error");}
    });
}

function redirectToInfo(data) {
    let redirect = "http://localhost:4000/project1/ui/getinfo.php";
    //window.location.href = redirect;
    $.redirect(redirect, data);
}

function redirectToAlunos(data) {
    let redirect = "http://localhost:4000/project1/ui/getalunos.php";
    //window.location.href = redirect;
    $.redirect(redirect, data);
}

$(document).ready(function(){
    //alert("Jquery loaded");

    $(document).on('click', '#login-btn', function(){
        $("#warn-user").html(" ");
        let email = $("#email-input").val();
        let password = $("#password-input").val();

        if (email != '') {
            getUser(email, password);

        } else {
            $("#warn-user").html("Caixa de email vazia");
        }
    });
});