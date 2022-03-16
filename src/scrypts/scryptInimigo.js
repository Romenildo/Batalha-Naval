
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







let posicoesDescobertas = []
let locaisDisponiveis = []

const instanciarlocaisDisponiveis = ( )=>{
   for(i = 0; i < linhas.length;i++){
      for(j = 0; j < colunas.length; j++){
         locaisDisponiveis.push(linhas[i]+ colunas[j])
      }
   }
}

const marcarCelulaInimiga = ()=>{
    iniciarFuncoesBatalha = false
    posicoesMarcadas=[]//possicoes dos 3 tiros

      //fazer verificacao se tem alguma posicao descaberta
    for(i = 0 ; i <3; i++){
      do{
         valor = gerarNumAleatorio(0, tamanhoTabela*tamanhoTabela)
         locaisDisponiveis.includes(locaisDisponiveis[valor])? posicao = locaisDisponiveis[valor]: posicao = null
       }while(posicao == null)
       
       posicoesMarcadas[i]=posicao
       locaisDisponiveis.splice(locaisDisponiveis.indexOf(posicao), 1, null);//verificar se aqui da erro
    }

   
    for(i = 0; i < 3; i ++){

      //verificar se o inimio encontrou alguma parte da embarcacao, entao ele pega o restante
      verificar(Embarcacoes[0][submarino_], 4)

    }
    console.log("CU")
    console.log(posicoesDescobertas)
    pintarCelulasTiro(posicoesMarcadas,"_usu")
    adicionarPosicoesExplodidas(posicoesMarcadas,"_usu")
    verificarSeEmbarcacaoCompleta("_usu")

  
    //colocar uma certa % de chance de ativar o tiro especial
    //gerar delay
    iniciarFuncoesBatalha = true
}

const verificar = (Embarcacao, quantidade) =>{
   for(i = 0; i < tamanho; i++){
      if(Embarcacao[tamanho].includes(item)){    
         Embarcacao[tamanho].forEach((valor)=>posicoesDescobertas.push(valor))
         Embarcacao[tamanho] = Embarcacoes[0][submarino][tamanho].map((e)=>{return "00"})
         return
      }
   }
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