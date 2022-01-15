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

posicoesOcupadas_ini = ["B1","B2","C1","C2","C3"]
adicionaEmbarcacaoNaLista(["B1", "B2"],1)
adicionaEmbarcacaoNaLista(["C1", "C2", "C3"],1)

const marcarCelulaInimiga = ()=>{
    //gerar numero com inteligencia
    //gerar as 3 posicoes
    //colocar uma certa % de chance de ativar o tiro especial

    pintarCelulasTiro(["A1","A2","A3"],"_usu")
    adicionarPosicoesExplodidas(["A1","A2", "A3"],"_usu")
    verificarSeEmbarcacaoCompleta("_usu")
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