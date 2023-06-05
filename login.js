const mensagem = document.querySelector(".mensagem");
const formulario = document.getElementById("formulario");
const email = document.getElementById("email");
const senha = document.getElementById("senha");

formulario.onsubmit = (evento) =>{

    let dados= JSON.parse(localStorage.getItem("dados"));
    let logado;
   
   dados.forEach(element => {
    if (element.email == email.value && element.senha == senha.value)
    {
        mensagem.innerHTML= "aguarde..."
        evento.preventDefault();
          let dados = JSON.parse(sessionStorage.getItem("logado")) || []
            dados.push(
             {
                  email: email.value
             }

            )
        sessionStorage.setItem("logado", JSON.stringify(dados));
        setTimeout(()=> {
            window.location.assign("paginainicial.html")
        },3000)
        return true;
    }
    else{
        evento.preventDefault();
        mensagem.innerHTML="senha ou email incorreto";
    }
   
   });
}