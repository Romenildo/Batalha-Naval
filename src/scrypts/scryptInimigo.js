
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

let Embarcacoes_ini
const gerarPosicaoAleatoria = (orientacao, tamanhoEmbarcacao) =>{
   letra = linhas[gerarNumAleatorio(0,tamanhoTabela-1)]
   numero = colunas[gerarNumAleatorio(0, tamanhoTabela -1)]
   posInicial = gerarPosicao(letra+numero)
   
   return gerarSequenciaInimigo(posInicial,tamanhoEmbarcacao, orientacao);
}

const gerarSequenciaInimigo =(posInicial, tamanhoEmbarcacao, orientacao)=>{
   let resultado=[];
    console.log(tamanhoTabela)
    console.log(linhas)
    console.log(colunas)
   if(orientacao == 0){
       //horizontal
       if(parseInt(posInicial[1]) + tamanhoEmbarcacao < tamanhoTabela-1)return null;
       for(let i = posInicial[1]; i<=parseInt(posInicial[1])+ tamanhoEmbarcacao; i++){
           resultado.push(posInicial[0]+i)
       }
       console.log(resultado)
       return resultado;
   }
   if(orientacao == 1){
       //vertical
       if(linhas.indexOf(posInicial[0])+ tamanhoEmbarcacao > tamanhoTabela-1)return null;
       for(let i = linhas.indexOf(posInicial[0]);i <= linhas.indexOf(posInicial[0])+ tamanhoEmbarcacao;i++){
           resultado.push(linhas[i]+posInicial[1])
       }
       console.log(resultado)

       return resultado;
   }
   
}

const colocarEmbarcacaoInimiga = () =>{

   let orientacao
   let sequencia
   let tamanhoEmbarcacao = 4;
   let quantidadeEmbarcacao = 1;

   for(;tamanhoEmbarcacao > 0;tamanhoEmbarcacao--){
      
      for(let  i= 0; i < quantidadeEmbarcacao; i ++ ){
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







let posicoesDescobertas = []
let locaisDisponiveis = []

const instanciarlocaisDisponiveis = ( )=>{
   for(let i = 0; i < linhas.length;i++){
      for(let j = 0; j < colunas.length; j++){
         locaisDisponiveis.push(linhas[i]+ colunas[j])
      }
   }
   Embarcacoes_ini =  JSON.parse(JSON.stringify(Embarcacoes));
 
}

const marcarCelulaInimiga = ()=>{
    iniciarFuncoesBatalha = false
    let posicoesMarcadas=[]//posicoes dos 3 tiros
    let qtdTiros = 0;
    let qtd=0;
   
   if(posicoesDescobertas.length > 0){
      //caso a maquina ja saiba as posicoes de uma ou mais embarcacoes
      let tamanhoDescobertas = posicoesDescobertas.length
      for(qtd =0; qtd < tamanhoDescobertas; qtd++){
         posicao= posicoesDescobertas.splice(0, 1).toString()
         posicoesMarcadas[qtd] =posicao
         locaisDisponiveis.splice(locaisDisponiveis.indexOf(posicao.toString()), 1, null);
      }
   }
   qtdTiros = qtd;
   for(let i = qtdTiros ; i <3; i++){
      do{
         //gerar uma posicao aceitavel
         valor = gerarNumAleatorio(0, tamanhoTabela*tamanhoTabela)
         locaisDisponiveis.includes(locaisDisponiveis[valor])? posicao = locaisDisponiveis[valor]: posicao = null
      }while(posicao == null)
 
      posicoesMarcadas[i]=posicao
      locaisDisponiveis.splice(locaisDisponiveis.indexOf(posicao), 1, null);
      posicoesDescobertas.splice(posicoesDescobertas.indexOf(posicao), 1);

   }
    
    for(let pos= 0; pos< 3; pos++){
      verificarSeTiroAcertouEmbarcacao(Embarcacoes_ini[0].submarino_, Embarcacoes_ini[0].submarino_.length, posicoesMarcadas[pos])
      verificarSeTiroAcertouEmbarcacao(Embarcacoes_ini[0].contra_torpedeiro, Embarcacoes_ini[0].contra_torpedeiro.length, posicoesMarcadas[pos])
      verificarSeTiroAcertouEmbarcacao(Embarcacoes_ini[0].navio_tanque, Embarcacoes_ini[0].navio_tanque.length, posicoesMarcadas[pos])
      verificarSeTiroAcertouEmbarcacao(Embarcacoes_ini[0].porta_aviao, Embarcacoes_ini[0].porta_aviao.length, posicoesMarcadas[pos])
    }
    pintarCelulasTiro(posicoesMarcadas,"_usu")
    adicionarPosicoesExplodidas(posicoesMarcadas,"_usu")
    verificarSeEmbarcacaoCompleta("_usu")

  
    //colocar uma certa % de chance de ativar o tiro especial
    //gerar delay
    iniciarFuncoesBatalha = true
}

const verificarSeTiroAcertouEmbarcacao = (Embarcacao, quantidade, posicao_tiro) =>{
   for(let i = 0; i < quantidade; i++){
      if(Embarcacao[i].includes(posicao_tiro)){    
         Embarcacao[i].forEach((valor)=>valor == posicao_tiro?null:posicoesDescobertas.push(valor))
         for(let k = 0; k < Embarcacao[i].length;k++){
            Embarcacao[i][k] = "--"
         }
         return true
      }
   }
   return false
}

function gerarNumAleatorio(inicio, fim) {
   return Math.floor((Math.random() * fim) + inicio);
}



