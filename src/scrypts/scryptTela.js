
//Navegacao das divs ao clicar nos botoes
const telaInicial = document.getElementById('telaInicial')
const telaRegras = document.getElementById('telaRegras')
const telaRanking = document.getElementById('telaRanking')
const telaJogar = document.getElementById('telaJogar')
const telaPreparacao = document.getElementById('telaPreparacao')


const mostrarTelaJogar = ()=>{
    telaInicial.style.display = "none"
    telaJogar.style.display = "block"
}

const mostrarTelaRegras = () =>{
    telaInicial.style.display = "none"
    telaRegras.style.display = "block"
}

const mostrarTelaRanking = ()=>{
    telaInicial.style.display = "none"
    telaRanking.style.display = "block"
}

const mostrarTelaPreparacao = () =>{
    telaJogar.style.display = "none"
    telaPreparacao.style.display = "block"
}


const voltarTelaInicial = () =>{
    telaRegras.style.display = "none"
    telaRanking.style.display = "none"
    telaJogar.style.display = "none"
    telaPreparacao.style.display = "none"
    telaInicial.style.display = "block"
}

const setAlert = (ativo, mensagem = "")=>{
    let alerta = document.getElementById('alerta')
    if(ativo==2){
        alerta.style.animation = "piscaAmarelo 2s infinite"
        alerta.style.border = "1px solid rgba(241, 245, 8, 0.63)"
    }
    if(ativo == 1){
        alerta.style.animation = "piscaVermelho 3s infinite"
        alerta.style.border = "1px solid rgba(241, 6, 6, 0.81)"
    }
    if(ativo == 0){
        alerta.style.display='none'
    }else{
        alerta.style.display='block'
        alerta.innerHTML = mensagem
    }
}