//inimigo
let tiroEspecial_ini = false

let qtdTiroEspecial_ini = 1
let pontosJogador_ini = 0
const qtdTirosNormais_ini = 3
let posicoesExplodidas_usu = [];

const tiros_especiais_ini = document.getElementById("qtdTirosEspeciais_ini")
tiros_especiais_ini.innerHTML = qtdTiroEspecial_ini

const pontos_jogador_ini = document.getElementById("pontosJogador_ini")
pontos_jogador_ini.innerHTML = pontosJogador_ini

const tiros_Normais_ini = document.getElementById("qtdTirosNormais_ini")
tiros_Normais_ini.innerHTML = qtdTirosNormais_ini

//restantes inimigo
const qtdPortaAviaoBatalha_usu = document.getElementById("qtdPortaAviao_usu")
const qtdNavioTanqueBatalha_usu = document.getElementById("qtdNavioTanque_usu")
const qtdContratorpedeiroBatalha_usu = document.getElementById("qtdContratorpedeiro_usu")
const qtdSubmarinoBatalha_usu = document.getElementById("qtdSubmarino_usu")

let portaAviaoRestante_usu;
let navioTanqueRestante_usu;
let contratorpedeiroRestante_usu;
let submarinoRestante_usu;


//gerar posicoes do inimigo
/* 
porta_aviao: [],
navio_tanque : [],
contra_torpedeiro : [],
submarino_ : []

posicoesOcupadas_ini
gerar todas as Posicoes Ocupadas do inimigo e as posicoes nos objetos
de modo aleatorio e inteligente
*/

const gerarPosicaoAleatoria = (orientacao, tamanhoEmbarcacao) =>{
   letra = linhas[gerarNumAleatorio(0,tamanhoTabela-1)]
   numero = colunas[gerarNumAleatorio(0, tamanhoTabela -1)]
   posInicial = gerarPosicao(letra+numero)
   
   return gerarSequenciaInimigo(posInicial,tamanhoEmbarcacao, orientacao);
}

const gerarSequenciaInimigo =(posInicial, tamanhoEmbarcacao, orientacao)=>{
   let resultado=[];
    
   if(orientacao == 0){
       //horizontal
       if(parseInt(posInicial[1]) + tamanhoEmbarcacao < tamanhoTabela-1)return null;
       for(let i = posInicial[1]; i<=parseInt(posInicial[1])+ tamanhoEmbarcacao; i++){
           resultado.push(posInicial[0]+i)
       }
       return resultado;
   }
   if(orientacao == 1){
       //vertical
       if(linhas.indexOf(posInicial[0])+ tamanhoEmbarcacao > tamanhoTabela-1)return null;
       for(let i = linhas.indexOf(posInicial[0]);i <= linhas.indexOf(posInicial[0])+ tamanhoEmbarcacao;i++){
           resultado.push(linhas[i]+posInicial[1])
       }
       return resultado;
   }
}

const colocarEmbarcacaoInimiga = () =>{

   let orientacao
   let sequencia
   let tamanhoEmbarcacao = 4;
   let quantidadeEmbarcacao = 1;

   for(;tamanhoEmbarcacao > 0;tamanhoEmbarcacao--){
      
      for( i= 0; i < quantidadeEmbarcacao; i ++ ){
         orientacao = gerarNumAleatorio(0,2);
         do{
            sequencia = gerarPosicaoAleatoria(orientacao, tamanhoEmbarcacao);
         }while(sequencia == null || verificaLocalDisponivel_ini(sequencia))
        //teste console.log(sequencia)
         sequencia.forEach((valor)=>posicoesOcupadas_ini.push(valor))
         adicionaEmbarcacaoNaLista(sequencia,1)
         sequencia = null;
      }
      quantidadeEmbarcacao++;
   }
   //teste  console.log(posicoesOcupadas_ini)
    // testeconsole.log(Embarcacoes[1])
}

colocarEmbarcacaoInimiga();









const marcarCelulaInimiga = ()=>{
    iniciarFuncoesBatalha = false
    //gerar numero com inteligencia
    //gerar as 3 posicoes
    //colocar uma certa % de chance de ativar o tiro especial

    pintarCelulasTiro(["A1","A2","A3"],"_usu")
    adicionarPosicoesExplodidas(["A1","A2", "A3"],"_usu")
    verificarSeEmbarcacaoCompleta("_usu")


    //gerar delay
    iniciarFuncoesBatalha = true
}

function gerarNumAleatorio(inicio, fim) {
   return Math.floor((Math.random() * fim) + inicio);
}









const diminuirEmbarcacaoNaBatalhaInimigo = (tamanho) =>{
    if(tamanho == 5 && portaAviaoRestante_usu > 0){
       qtdPortaAviaoBatalha_usu.innerHTML = --portaAviaoRestante_usu
       return
    }
    if(tamanho == 4 && navioTanqueRestante_usu > 0){
       qtdNavioTanqueBatalha_usu.innerHTML = --navioTanqueRestante_usu
       return
    }
    if(tamanho == 3 && contratorpedeiroRestante_usu > 0){
       qtdContratorpedeiroBatalha_usu.innerHTML = --contratorpedeiroRestante_usu
       return
    }
    if(tamanho == 2 && submarinoRestante_usu > 0){
       qtdSubmarinoBatalha_usu.innerHTML = --submarinoRestante_usu
       return
    }
    
}