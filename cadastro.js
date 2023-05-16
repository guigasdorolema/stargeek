const mensagem = document.querySelector(".mensagem");
const email = document.getElementById("Email");
const senha= document.getElementById("Senha");
const nome= document.getElementById("Nome");
const formulario = document.getElementById("formulario");
alert("Cadastro Feito")

formulario.onsubmit = (evento) =>{
    let dados = JSON.parse(localStorage.getItem("dados"));

    dados.forEach(element => {
        if (MediaElementAudioSourceNode.email == email.value && MediaElementAudioSourceNode.senha == senha.value) {
            evento.preventDefault();
            mensagem.innerHTML="Logado";
            return true;
        } else{
            evento.preventDefault();
            mensagem.innerHTML ="Senha ou E-mail Incorreto";
        }
        
    });
}