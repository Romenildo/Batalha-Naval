
//inimigo
let tiroEspecial_ini = false
let qtdTiroEspecial_ini = 1
const qtdTirosNormais_ini = 3

let pontosJogador_ini = 0
let posicoesExplodidas_usu = [];

let portaAviaoRestante_usu;
let navioTanqueRestante_usu;
let contratorpedeiroRestante_usu;
let submarinoRestante_usu;

let Embarcacoes_ini

//parte visual
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


const gerarPosicaoAleatoria = (orientacao, tamanhoEmbarcacao) =>{
   letra = LINHAS[gerarNumAleatorio(0,TAMANHO_TABELA-1)]
   numero = COLUNAS[gerarNumAleatorio(0, TAMANHO_TABELA-1)]
   posInicial = gerarPosicao(letra+numero)

   let ultimaPosicao =(parseInt(posInicial[1]) + tamanhoEmbarcacao)
   if((ultimaPosicao > parseInt(TAMANHO_TABELA)-1) == true){
      //verifica se a posicao cabe dentro da tabela
      return null;
   }

   return gerarSequenciaInimigo(posInicial,tamanhoEmbarcacao, orientacao);
}

const gerarSequenciaInimigo =(posInicial, tamanhoEmbarcacao, orientacao)=>{
   //recebe a posicao inicial e retorna as posicoes dependendo do tamanho A1 tamanho 3 => A1, A2, A3
   let resultado=[];

   if(orientacao == 0){
       //horizontal
      for(let i = posInicial[1]; i<=parseInt(posInicial[1])+ tamanhoEmbarcacao; i++){
         resultado.push(posInicial[0]+i)
       }
       return resultado;
   }
   if(orientacao == 1){
       //vertical
       if(LINHAS.indexOf(posInicial[0])+ tamanhoEmbarcacao > TAMANHO_TABELA-1)return null;

      for(let i = LINHAS.indexOf(posInicial[0]);i <= LINHAS.indexOf(posInicial[0])+ tamanhoEmbarcacao;i++){
         resultado.push(LINHAS[i]+posInicial[1])
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
      
      for(let  i= 0; i < quantidadeEmbarcacao; i ++ ){
         orientacao = gerarNumAleatorio(0,2);
         do{
            sequencia = gerarPosicaoAleatoria(orientacao, tamanhoEmbarcacao);
         }while(sequencia == null || verificaLocalDisponivel_ini(sequencia))
       
         sequencia.forEach((valor)=>posicoesOcupadas_ini.push(valor))
         adicionaEmbarcacaoNaLista(sequencia,1)
         sequencia = null;
      }
      quantidadeEmbarcacao++;
   }
}

let posicoesDescobertas = []//posicoes que o inimigo ja sabe que tem navio
let locaisDisponiveis = []//todos os locais disponiveis para atirar

const instanciarlocaisDisponiveis = ( )=>{
   for(let i = 0; i < LINHAS.length;i++){
      for(let j = 0; j < COLUNAS.length; j++){
         locaisDisponiveis.push(LINHAS[i]+ COLUNAS[j])
      }
   }
   Embarcacoes_ini =  JSON.parse(JSON.stringify(Embarcacoes));
}

const marcarCelulaInimiga = ()=>{
    iniciarFuncoesBatalha = false
    let posicoesMarcadas=[]//posicoes dos 3 tiros
    let qtdTiros = 0;
    let qtd=0;

    let tiroEspecial = gerarNumAleatorio(0,3)
    if(tiroEspecial == 1 && qtdTiroEspecial_ini > 0 && posicoesDescobertas.length <= 0){
      //ativar tiro especial
      do{
         //gerar uma posicao aceitavel
         valor = gerarNumAleatorio(0, TAMANHO_TABELA*TAMANHO_TABELA)
         locaisDisponiveis.includes(locaisDisponiveis[valor])? posicao = locaisDisponiveis[valor]: posicao = null
      }while(posicao == null)

      //gera sequencia para as explosoes do tiro especial 3x3
      let sequenciaBombaEspecial = posicoesBombaEspecial(posicao)

      for(let i = 0; i < sequenciaBombaEspecial.length; i++){
         if(sequenciaBombaEspecial[i]!="00"){
            locaisDisponiveis.splice(locaisDisponiveis.indexOf(sequenciaBombaEspecial[i]), 1, null);
            posicoesDescobertas.splice(posicoesDescobertas.indexOf(sequenciaBombaEspecial[i]), 1);
            verificarSeTiroAcertouEmbarcacao(Embarcacoes_ini[0].submarino_, Embarcacoes_ini[0].submarino_.length, sequenciaBombaEspecial[i])
            verificarSeTiroAcertouEmbarcacao(Embarcacoes_ini[0].contra_torpedeiro, Embarcacoes_ini[0].contra_torpedeiro.length, sequenciaBombaEspecial[i])
            verificarSeTiroAcertouEmbarcacao(Embarcacoes_ini[0].navio_tanque, Embarcacoes_ini[0].navio_tanque.length, sequenciaBombaEspecial[i])
            verificarSeTiroAcertouEmbarcacao(Embarcacoes_ini[0].porta_aviao, Embarcacoes_ini[0].porta_aviao.length, sequenciaBombaEspecial[i])
         }  
      }
      pintarCelulasTiro(sequenciaBombaEspecial,"_usu")
      adicionarPosicoesExplodidas(sequenciaBombaEspecial,"_usu")
      verificarSeEmbarcacaoCompleta("_usu")
      tiros_especiais_ini.innerHTML = --qtdTiroEspecial_ini

  }else{
   //tiro normal sequencia 3x
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
            valor = gerarNumAleatorio(0, TAMANHO_TABELA*TAMANHO_TABELA)
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
  }
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

const resetEmbarcacoes_inimigo = () =>{
   pintaCelula(posicoesOcupadas_ini)

   posicoesOcupadas_ini = []
   Embarcacoes[1].porta_aviao = []
   Embarcacoes[1].navio_tanque = []
   Embarcacoes[1].contra_torpedeiro = []
   Embarcacoes[1].submarino_ = []
   posicoesDescobertas = []
   locaisDisponiveis = []
   setAlert(0)
}


