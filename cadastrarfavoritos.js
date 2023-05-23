const botaomodal = document.getElementById("btn");
const cards = document.querySelector(".cards");
const cadmodal = document.querySelector(".cadmodal");
const formulario = document.getElementById("formulario");
const nome = document.getElementById("nome");
const descricao = document.getElementById("descricao");
const foto = document.getElementById("foto");
const botaocadastrar = document.querySelector(".btncadastrar");
const botaoeditar = document.querySelector(".btneditar");
const botaofechar = document.querySelector(".btnclose");
const idelemento = document.getElementById("idalterar");

botaomodal.onclick = ()=>{
    cadmodal.style.display = "flex";
    botaoeditar.style.display = "none";
}

function fechar(){
    cadmodal.style.display = "none";
}

botaocadastrar.onclick = (evento)=>{
    evento.preventDefault();
    fenvio()
    .then(result =>{
                     if(result){
                        let dados = JSON.parse(localStorage.getItem("catalogo"))||[];
                        dados.push(
                                      {
                                         nome: nome.value,
                                        descricao: descricao.value,
                                        foto: nomeArq
                                        }
                                     )
                        localStorage.setItem("catalogo", JSON.stringify(dados));
                        
                     }else{
                        alert("Houve erro no envio do arquivo");
                     }

                    });
    
}

function carregarCatalogo(){
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    let divcard = document.createElement("div");
    if(dados == null){
        divcard.innerHTML = "<p>Nenhum item cadsatrado</p>";
        cards.appendChild(divcard);
        return null;
    }

    dados.forEach((elemento, indice) => {
        let divcard = document.createElement("div");
        divcard.innerHTML = `<div class="cardimagem"> <img src="img/${elemento.foto}"> </div> <div class="cardnome">${elemento.nome} <p>${elemento.descricao}</p></div> <div class="cardinfo">
        <div class="editar"><i class="bi bi-pencil-fill" onclick="editar(${indice})"></i></div>
        <div class="excluir"><i class="bi bi-trash3-fill" onclick="excluir(${indice})"></i></div>
        </div>`;

        cards.appendChild(divcard);
        
    });
}

carregarCatalogo();

function editar(indice){
    nome.value = "";
    descricao.value = "";
    foto.files[0] = null;
    cadmodal.style.display = "flex";
    botaocadastrar.style.display = "none";
    botaoeditar.style.display = "block";
    
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    nome.value = dados[indice].nome;
    descricao.value = dados[indice].descricao;
    //foto.files[0] = dados[indice].foto;
    idelemento.value = indice;
    fotoa = dados[indice].foto;
}
var fotoa;
botaoeditar.onclick = (evento) =>{
    if ((fotoa != foto.value)&&(foto.value != "")){
    evento.preventDefault();
    fenvio()
    .then(result =>{
                     if(result){
                        salvaEdicao(nomeArq);
                        }
                    });
    }
    else
    {
        salvaEdicao(fotoa);
    } 
}
function salvaEdicao(pfoto){
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    dados[idelemento.value].nome = nome.value;
    dados[idelemento.value].descricao = descricao.value;
    dados[idelemento.value].foto = pfoto;
    localStorage.setItem("catalogo", JSON.stringify(dados));

}

function excluir(indice){
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    if(dados.length == 1)
    {localStorage.clear("catalogo");}
    else{
    dados.splice(indice,1);
    localStorage.setItem("catalogo", JSON.stringify(dados));
    }
    window.location.reload();
}

var nomeArq;
async function fenvio() { 
    const url = 'http://localhost:3005/upload';
    const arquivo = document.getElementById("foto").files[0];
    const formData = new FormData();
    formData.append('arquivo', arquivo);
    console.log(JSON.stringify(formData));
    try{
         
         var resp = await fetch(url, {
                                       method: 'POST',
                                       body: formData,
                                     }
                               ) 
         if (resp.ok){
           let respText = await resp.text();
           nomeArq = respText;
           return true;
         }
         else{
              return false;
         }
       }
    catch (error) {
        console.error(error);
        return false;
      }
}