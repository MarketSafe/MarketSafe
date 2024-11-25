// sessão
function validarSessao() {

    var email = localStorage.EMAIL_USUARIO;
    var nome = localStorage.NOME_USUARIO;
        
    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        b_usuario.innerHTML = nome;
    } else {
        window.location = "../cadastro_login.html";
    }
}

function limparSessao() {
    localStorage.clear();
    window.location = "../cadastro_login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    if (divAguardar) { // Verifica se o elemento foi encontrado
        divAguardar.style.display = "none";

        var divErrosLogin = document.getElementById("div_erros_login");
        if (texto) {
            divErrosLogin.style.display = "flex";
            divErrosLogin.innerHTML = texto;
        }
    } else {
        console.error("Elemento 'div_aguardar' não encontrado!"); // Adicionado para depuração
    }
}



