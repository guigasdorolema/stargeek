const mensagem = document.querySelector(".mensagem");
const formulario = document.getElementById("formulario");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");


formulario.onsubmit = (evento) =>{
    alert("Cadastro realizado, por favor aguarde")
    if (nome.value ==""){
        evento.preventDefault();
        mensagem.innerHTML ="<p>Digite seu nome aqui! </p>";
        nome.focus();
        return null;
    }

    if (email.value == ""){
        evento.preventDefault();
        mensagem.innerHTML = "<p> Digite seu email </p>"
        email.focus();
        return null;
    }

    if (senha.value == ""){
        evento.preventDefault();
        mensagem.innerHTML = "<p> Digite sua senha </p>"
        senha.focus();
        return null;
    }


    let dados = JSON.parse(localStorage.getItem("dados")) || [];
    dados.push({
        nome : nome.value,
        email : email.value,
        senha : senha.value
    })

    localStorage.setItem("dados", JSON.stringify(dados));
    evento.preventDefault();
    mensagem.innerHTML="<p> Parabéns Cadastro feito com sucesso </p>";

    setTimeout(()=>{
         window.location.assign("login.html");
    }, 3000);
}