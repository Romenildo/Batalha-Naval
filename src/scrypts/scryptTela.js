let nomeUsuarioAtual;
var cronometro_timer;

//Navegacao das divs ao clicar nos botoes
const telaInicial = document.getElementById('telaInicial')
const telaRegras = document.getElementById('telaRegras')
const telaRanking = document.getElementById('telaRanking')
const telaJogar = document.getElementById('telaJogar')
const telaPreparacao = document.getElementById('telaPreparacao')
const telaBatalha = document.getElementById('telaBatalha')


const mostrarTelaJogar = ()=>{
    telaInicial.style.display = "none"
    telaJogar.style.display = "block"
}

const mostrarTelaRegras = () =>{
    telaInicial.style.display = "none"
    telaRegras.style.display = "block"
}

const mostrarTelaRanking = ()=>{
    adicionarPosicoesRanking ()
    telaInicial.style.display = "none"
    telaRanking.style.display = "block"
}


const mostrarTelaPreparacao = (tamanhoTabela) =>{
    nomeUsuarioAtual = document.getElementById("nomeUsuario").value
    if(nomeUsuarioAtual == ""){
        setAlert(1, "ERRO!! Digite o nome do usuario.",0)
        return
    }
    if(nomeUsuarioAtual.length>15){
        setAlert(1, "ERRO!! Nome deve ser menor que 15 caracteres",0)
        return
    }
    criarTabela(tamanhoTabela,1,"_usu")
    telaJogar.style.display = "none"
    telaPreparacao.style.display = "block"
    setAlert(0)
    setAlert(0,"",0)
    
}

const voltarTelaEscolherTamanho = () =>{
    telaPreparacao.style.display = "none"
    telaJogar.style.display = "block"
    reformularTelaParaNormal()
    setAlert(0,"",0)
}
const mostrarTelaBatalha = () =>{
    document.getElementById('tabuleiro-jogador').innerHTML = ""
    telaPreparacao.style.display = "none"
    telaBatalha.style.display = "block"
}


const voltarTelaInicial = () =>{
    telaRegras.style.display = "none"
    telaRanking.style.display = "none"
    telaJogar.style.display = "none"
    telaPreparacao.style.display = "none"
    telaBatalha.style.display = "none"
    telaInicial.style.display = "block"
    setAlert(0,"",0)
    reformularTelaParaNormal()
}

const setAlert = (ativo, mensagem = "", pos = 1)=>{
    let alerta = document.getElementById('alerta')
    if(pos == 0){alerta = document.getElementById('alertaJogar')}
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

const cronometro = (tempo) =>{
    var seg = 59;
	var min = tempo;
	cronometro_timer = window.setInterval(function() {
		if (seg == 0) { min--; seg = 59; }
		if (seg < 10) document.getElementById("segundos").innerHTML = "0" + seg ; else document.getElementById("segundos").innerHTML = seg ;
		if (min < 10) document.getElementById("minutos").innerHTML = "0" + min ; else document.getElementById("minutos").innerHTML = min ;		
		seg--;
	},1000);

    //se o tempo acabar
    if(min < 1 && seg <=1){
        setTimeout(function(){
            alert(`Tempo Esgotado!!! ${nomeUsuarioAtual} Você fez ${pontosJogador_usu} pontos!`)
        
             adicionarUsuarioAoRanking()
             resetarJogo()
             return
        },1000);
    }
}

//reformular a tela para suportar o novo tamanho da tabela 15x15
const reformularTelaPara15x15 = ()=>{
    document.getElementById('container').style.height = "830px"
    document.getElementById('tabuleiro-jogador').style.height = "615px"
    document.getElementById('foo').style.marginTop = "105px"
    document.getElementById('tabuleiros').style.height = "592px"

    document.getElementById('tabuleiroBatalha').style.height = "608px"
    document.getElementById('tabuleiroBatalha1').style.height = "603px"
    document.getElementById('tabuleiroBatalha2').style.height = "603px"
    document.getElementById('foo').style.marginTop = "122px"
    document.getElementById('container').style.height = "846px"
        
}
const reformularTelaParaNormal = ()=>{
    document.getElementById('container').style.height = "723px"
    document.getElementById('tabuleiro-jogador').style.height = "472px"
    document.getElementById('foo').style.marginTop = "0px"
    document.getElementById('tabuleiros').style.height = "476px"

    document.getElementById('tabuleiroBatalha').style.height = "466px"
    document.getElementById('tabuleiroBatalha1').style.height = "466px"
    document.getElementById('tabuleiroBatalha2').style.height = "466px"
        
}



/*
function mudarCor(local) {
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;
    let opacidade = 1.0

    document.getElementById(local).style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${opacidade})`
 }

 */

 const adicionarPosicoesRanking = () =>{
     //atualizar os dados ao finalizar o jogo
    let camposRanking = document.getElementsByClassName("ranking-pos")

    for(let i = 0; i<camposRanking.length;i++){
        camposRanking[i].innerHTML =
        `${i+1}. ${rankingDados[i].nome}  <center style="margin: -27px 0px 0px 320px;"> ${ rankingDados[i].pontos} pontos (${rankingDados[i].data} | ${rankingDados[i].hora}) </center>`

    }
 }


