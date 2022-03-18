//usuario
let contadorMarcas = 0;
let posicoesMarcas = [0,0,0]
let iniciarFuncoesBatalha = false

let tiroEspecial_usu = false
let qtdTiroEspecial_usu = 1
const qtdTirosNormais_usu = 3

let pontosJogador_usu = 0
let posicoesExplodidas_ini = [];


let portaAviaoRestante_ini;
let navioTanqueRestante_ini;
let contratorpedeiroRestante_ini;
let submarinoRestante_ini;

//parte visual
const tiros_especiais_usu = document.getElementById("qtdTirosEspeciais_usu")
tiros_especiais_usu.innerHTML = qtdTiroEspecial_usu

const pontos_jogador_usu = document.getElementById("pontosJogador_usu")
pontos_jogador_usu.innerHTML = pontosJogador_usu

const tiros_Normais_usu = document.getElementById("qtdTirosNormais_usu")
tiros_Normais_usu.innerHTML = qtdTirosNormais_usu

// quantidade das embarcacoes restantes na batalha
const qtdPortaAviaoBatalha_ini = document.getElementById("qtdPortaAviao_ini")
const qtdNavioTanqueBatalha_ini = document.getElementById("qtdNavioTanque_ini")
const qtdContratorpedeiroBatalha_ini = document.getElementById("qtdContratorpedeiro_ini")
const qtdSubmarinoBatalha_ini = document.getElementById("qtdSubmarino_ini")

const marcarCelula = (div) =>{
    if(iniciarFuncoesBatalha==false){
        return 
    }

    let id = div.id.split("_")[0]//transformar A1_ini em A1 para fazer os calculos
    //caso clicar na celula ja vermelha explodida
    if(posicoesExplodidas_ini.includes(id)){
        return
    }
    
    if(tiroEspecial_usu == true && qtdTiroEspecial_usu > 0){
        //ativar tiro especial
        let sequenciaBombaEspecial = posicoesBombaEspecial(id)

        pintarCelulasTiro(sequenciaBombaEspecial,"_ini")
        adicionarPosicoesExplodidas(sequenciaBombaEspecial,"_ini")
        verificarSeEmbarcacaoCompleta("_ini")
        tiros_especiais_usu.innerHTML = --qtdTiroEspecial_usu

        efeitoTiroEspecial(0)
        //ativar vez do oponente
        marcarCelulaInimiga()
        verificarFinalizarPartida()
        
    }else{
        //tiro normal
        efeitoTiroEspecial(0)
        document.getElementById(id+"_ini").style.background= 'url("src/dados/imgs_Embarcacoes/tiroMarcacao.png")'
        
        if(posicoesMarcas.includes(id)){
            //caso clicar no mesmo novamente
           document.getElementById(id+"_ini").style.background= 'url("src/dados/imgs_Embarcacoes/azul.png")'

            posicoesMarcas.forEach((nome, indice)=>{
                if(nome == id){
                    posicoesMarcas[indice] = 0
                }
            })
            contadorMarcas--
            tiros_Normais_usu.innerHTML = qtdTirosNormais_usu - contadorMarcas
        }else{
            for(let i = 0; i<qtdTirosNormais_usu;i++){
                if(posicoesMarcas[i]==0){
                    posicoesMarcas[i] = id
                    break
                }
            }
            contadorMarcas++
            tiros_Normais_usu.innerHTML = qtdTirosNormais_usu - contadorMarcas
        }
        
        //atirar nas 3 marcas
        if(contadorMarcas == qtdTirosNormais_usu){
            pintarCelulasTiro(posicoesMarcas,"_ini")
            adicionarPosicoesExplodidas(posicoesMarcas,"_ini")
            verificarSeEmbarcacaoCompleta("_ini") 
            resetarMarcas()

            //ativar vez do inimigo
            marcarCelulaInimiga()
            
            verificarFinalizarPartida()
        }
    }
}

const posicoesBombaEspecial= (id)=>{//OK
    //sequencia ao redor da explosao
    //           X  X  X 
    //           X  O  X
    //           X  X  X 
    LINHAS.push("0")
    LINHAS.unshift("0")
    
    let posicoes = gerarPosicao(id)
    let posicoesBomba = []

    for(let i = 0; i< LINHAS.length; i++){
        if(LINHAS[i]==posicoes[0]){
            for(let j = i-1; j<i+2;j++){
                for(let k = posicoes[1]-1;k<parseInt(posicoes[1])+2;k++){
                    posicoesBomba.push(LINHAS[j]+k)
                }
            }
            break
        }
    }
    posicoesBomba = filtrarPosicoesBombaEspecial(posicoesBomba)
    return posicoesBomba;
}


const iniciarBatalha=()=>{
    mostrarTelaBatalha()
    iniciarFuncoesBatalha = true
    criarTabela(TAMANHO_TABELA,2, "_ini")
    criarTabela(TAMANHO_TABELA,3,"_usu")

    //cronometro tela 10x10(20min) 15x15(30min)
    window.clearInterval(cronometro_timer);
    if(TAMANHO_TABELA == 10){
        cronometro(19)
    }else{
        cronometro(29)
    }
    //instanciar inimigo
    colocarEmbarcacaoInimiga()
    instanciarlocaisDisponiveis()
    adicionarQtdEmbarcacoesBatalha()
}



const adicionarQtdEmbarcacoesBatalha = ()=>{
    //restante do inimigo
    portaAviaoRestante_ini = Embarcacoes[1].porta_aviao.length
    navioTanqueRestante_ini= Embarcacoes[1].navio_tanque.length
    contratorpedeiroRestante_ini = Embarcacoes[1].contra_torpedeiro.length
    submarinoRestante_ini= Embarcacoes[1].submarino_.length

    qtdPortaAviaoBatalha_ini.innerHTML = portaAviaoRestante_ini 
    qtdNavioTanqueBatalha_ini.innerHTML = navioTanqueRestante_ini
    qtdContratorpedeiroBatalha_ini.innerHTML = contratorpedeiroRestante_ini
    qtdSubmarinoBatalha_ini.innerHTML =  submarinoRestante_ini

    //suas restantes
    portaAviaoRestante_usu = Embarcacoes[0].porta_aviao.length
    navioTanqueRestante_usu = Embarcacoes[0].navio_tanque.length
    contratorpedeiroRestante_usu = Embarcacoes[0].contra_torpedeiro.length
    submarinoRestante_usu = Embarcacoes[0].submarino_.length

    qtdPortaAviaoBatalha_usu.innerHTML = portaAviaoRestante_usu
    qtdNavioTanqueBatalha_usu.innerHTML = navioTanqueRestante_usu
    qtdContratorpedeiroBatalha_usu.innerHTML = contratorpedeiroRestante_usu
    qtdSubmarinoBatalha_usu.innerHTML =  submarinoRestante_usu
}

//FUNCOES ADICIONAIS

const resetarMarcas = ()=>{
    contadorMarcas = 0;
    tiros_Normais_usu.innerHTML = qtdTirosNormais_usu - contadorMarcas
    for(let i = 0; i<3;i++){
        posicoesMarcas[i] = 0
    }
}

const efeitoTiroEspecial = (ativo)=>{
    const container = document.getElementById('container')
    if(ativo == 1 && qtdTiroEspecial_usu > 0){
        tiroEspecial_usu = true
        colocarGradient("linear-gradient(45deg, rgb(243, 90, 19),rgb(238, 14, 14),rgb(236, 225, 120),#fff)")
    }else{
        tiroEspecial_usu = false
        colocarGradient("linear-gradient(45deg, rgb(10, 48, 151),rgb(93, 187, 190),rgb(182, 230, 245),#fff)")
    }
    
}

const colocarGradient=(cor)=>{
    container.style.background = cor
    container.style.animation = "colors 8s ease infinite"
    container.style.backgroundSize = "300% 300%"
}

const filtrarPosicoesBombaEspecial = (sequencia)=>{
    //caso a bomba esteja em um dos cantos do tabueiro, acender somente os que estao dentro do tabuleiro
    const posicoesFiltrada = sequencia.map((e)=>
    {
        let posicoes = gerarPosicao(e)
        //fazer a troca para o tabuleiro 15
        if(posicoes[0] == 0 || posicoes[0] == TAMANHO_TABELA+1 || posicoes[1]== 0 || posicoes[1] == TAMANHO_TABELA+1){
            return "00"
        }
        return e 
    })

    return posicoesFiltrada
}

const pintarCelulasTiro = (sequencia, _extensao) =>{
    let auxPosicoesOcupadas;
    _extensao =="_ini"?auxPosicoesOcupadas = posicoesOcupadas_ini: auxPosicoesOcupadas = posicoesOcupadas_usu
   
    for(let i = 0; i<sequencia.length; i++){
        if(sequencia[i]!= "00"){
             if(auxPosicoesOcupadas.includes(sequencia[i])){
                 //encontrou navio
                 desenharEmbarcacaoNaBatalha(sequencia[i], _extensao)
                 _extensao =="_ini"?pontos_jogador_usu.innerHTML = pontosJogador_usu += 500: pontos_jogador_ini.innerHTML = pontosJogador_ini+= 500
             }else{
                 //nao encontrou navio
                document.getElementById(sequencia[i]+ _extensao).style.background= 'url("src/dados/imgs_Embarcacoes/explosao.png")'
             }
             document.getElementById(sequencia[i]+_extensao).innerHTML = ""
        }
     }
}

const adicionarPosicoesExplodidas = (posicoes, _extensao)=>{
    
    for(let n = 0; n < posicoes.length; n++){
        if(_extensao == "_ini"){
            posicoesExplodidas_ini.push(posicoes[n])
        }else{
            posicoesExplodidas_usu.push(posicoes[n])
        }
    }
}

const desenharEmbarcacaoNaBatalha=(celula, _extensao) =>{
    let tipo
    tipo = _extensao=="_ini"? tipo = 1: tipo = 0;
    
    if(verificarSePosicaoNaEmbarcacao(celula,_extensao, Embarcacoes[tipo].porta_aviao, 5))return;
    if(verificarSePosicaoNaEmbarcacao(celula,_extensao, Embarcacoes[tipo].navio_tanque, 4))return;
    if(verificarSePosicaoNaEmbarcacao(celula,_extensao, Embarcacoes[tipo].contra_torpedeiro, 3))return;
    if(verificarSePosicaoNaEmbarcacao(celula,_extensao, Embarcacoes[tipo].submarino_, 2))return;

}

const verificarSePosicaoNaEmbarcacao=(celula,_extensao, Embarcacao, tamanho)=>{
    let encontrouPos = -1;
    let orientacao = []
    for(let i = 0; i < Embarcacao.length; i ++){
        let posicao = Embarcacao[i].indexOf(celula);
        if(posicao != -1){
            encontrouPos = posicao
            orientacao[0] = Embarcacao[i][0].split("")[0]
            orientacao[1] = Embarcacao[i][1].split("")[0]
        }
    }
    
    if(encontrouPos!=-1){
        desenhaCelula(celula, _extensao, encontrouPos, tamanho, orientacao)
        return true;
    }

    return false
}

desenhaCelula=(celula, _extensao, posicao, tamanho, orientacao)=>{

    if(orientacao[0] === orientacao[1]){
        //horizontal
        switch(tamanho){
            case 5:
                document.getElementById(celula + _extensao).style.background= 'url("src/dados/imgs_Embarcacoes/portaaviao'+(parseInt(posicao) + 1) +'.png")'
                break;
            case 4:
                document.getElementById(celula + _extensao).style.background= 'url("src/dados/imgs_Embarcacoes/naviotanque'+(parseInt(posicao) + 1) +'.png")'
                break;
            case 3:
                document.getElementById(celula + _extensao).style.background= 'url("src/dados/imgs_Embarcacoes/contratorpedeiro'+(parseInt(posicao) + 1) +'.png")'
                break;
            case 2:
                document.getElementById(celula + _extensao).style.background= 'url("src/dados/imgs_Embarcacoes/submarino'+(parseInt(posicao) + 1) +'.png")'
                break;
        }
    }else{
        //vertical
        switch(tamanho){
            case 5:
                document.getElementById(celula + _extensao).style.background= 'url("src/dados/imgs_Embarcacoes/v_portaaviao'+(parseInt(posicao) + 1) +'.png")'
                break;
            case 4:
                document.getElementById(celula + _extensao).style.background= 'url("src/dados/imgs_Embarcacoes/v_naviotanque'+(parseInt(posicao) + 1) +'.png")'
                break;
            case 3:
                document.getElementById(celula + _extensao).style.background= 'url("src/dados/imgs_Embarcacoes/v_contratorpedeiro'+(parseInt(posicao) + 1) +'.png")'
                break;
            case 2:
                document.getElementById(celula + _extensao).style.background= 'url("src/dados/imgs_Embarcacoes/v_submarino'+(parseInt(posicao) + 1) +'.png")'
                break;
        }
    }
    
}


// Diminuir a quantidade de embarcacoes restantes ao emcontra-la completa na partida
const verificarSeEmbarcacaoCompleta = (_extensao) =>{
    let tipo;
    _extensao == "_ini"?tipo = 1: tipo = 0
   
    verificarPorTipoEmbarcacao(Embarcacoes[tipo].porta_aviao, tipo)
    verificarPorTipoEmbarcacao(Embarcacoes[tipo].navio_tanque, tipo)
    verificarPorTipoEmbarcacao(Embarcacoes[tipo].contra_torpedeiro, tipo)
    verificarPorTipoEmbarcacao(Embarcacoes[tipo].submarino_, tipo)
   
}

let posicoesExplodidasUsadas_ini = []
let posicoesExplodidasUsadas_usu = []

const verificarPorTipoEmbarcacao = (Embarcacao,tipo) =>{
    let AuxPosicoesExplodidas;
    
    if(tipo == 1){
        AuxPosicoesExplodidas = posicoesExplodidas_ini.slice()
        for(let i =0; i < posicoesExplodidasUsadas_ini.length;i++){
            AuxPosicoesExplodidas.splice(AuxPosicoesExplodidas.indexOf(posicoesExplodidasUsadas_ini[i]), 1);
        }
    }else{
        AuxPosicoesExplodidas = posicoesExplodidas_usu.slice()
        for(let i =0; i < posicoesExplodidasUsadas_usu.length;i++){
            AuxPosicoesExplodidas.splice(AuxPosicoesExplodidas.indexOf(posicoesExplodidasUsadas_usu[i]), 1);
        }
    }
    
   let embarcacaoAtual = []
   for(let i =0; i< Embarcacao.length;i++){
        let quant = 0;
        for(let j = 0; j< Embarcacao[i].length;j++){
            if(AuxPosicoesExplodidas.includes(Embarcacao[i][j])){
                quant++
                embarcacaoAtual.push(Embarcacao[i][j])
            }
        }
        if(quant == Embarcacao[i].length){
            tipo == 1?diminuirEmbarcacaoNaBatalha(quant):diminuirEmbarcacaoNaBatalhaInimigo(quant)
            for(let k = 0; k < embarcacaoAtual.length;k++){
                tipo ==1?posicoesExplodidasUsadas_ini.push(embarcacaoAtual[k]):posicoesExplodidasUsadas_usu.push(embarcacaoAtual[k])
            }
        }
   }
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
const diminuirEmbarcacaoNaBatalha = (tamanho) =>{
     if(tamanho == 5 && portaAviaoRestante_ini > 0){
        qtdPortaAviaoBatalha_ini.innerHTML = --portaAviaoRestante_ini
        return
     }
     if(tamanho == 4 && navioTanqueRestante_ini > 0){
        qtdNavioTanqueBatalha_ini.innerHTML = --navioTanqueRestante_ini
        return
     }
     if(tamanho == 3 && contratorpedeiroRestante_ini > 0){
        qtdContratorpedeiroBatalha_ini.innerHTML = --contratorpedeiroRestante_ini
        return
     }
     if(tamanho == 2 && submarinoRestante_ini > 0){
        qtdSubmarinoBatalha_ini.innerHTML = --submarinoRestante_ini
        return
     }
     
}

//finalizar partida
const verificarFinalizarPartida = ()=>{
    let embarcacoesRestantes = portaAviaoRestante_ini+ navioTanqueRestante_ini + contratorpedeiroRestante_ini + submarinoRestante_ini
    let embarcacoesRestantesInimigo = portaAviaoRestante_usu+ navioTanqueRestante_usu + contratorpedeiroRestante_usu + submarinoRestante_usu
    if(embarcacoesRestantes <= 0){
        setTimeout(function(){
            alert(`Parabens!!! ${nomeUsuarioAtual} Você ganhou  a batalha!`)
        
             adicionarUsuarioAoRanking()
             resetarJogo()
             return
        },1000);
    }
    if(embarcacoesRestantesInimigo <= 0){
        setTimeout(function(){
            alert(`A Maquina ganhou!! que pena nao foi dessa vez!`)
            resetarJogo()
            return;
        },500);
    }

}


const adicionarUsuarioAoRanking = () =>{

    let pontosFinal = pontosJogador_usu
    let nomeFinal = nomeUsuarioAtual
    let data = new Date();

    let dataFinal = data.getDate() + "/" + (data.getMonth()+1) + "/" +data.getFullYear()
    let horaFinal = data.getHours() + ":" + data.getMinutes()

    let usuarioFinal = {
        posicao: 0,
        nome : nomeFinal,
        pontos : pontosFinal,
        data: dataFinal,
        hora: horaFinal,
        tempoRestante : ""
    }
    for(let i = 0; i<5;i++){
        if(rankingDados[i].pontos<= usuarioFinal.pontos){
            usuarioFinal.posicao = i+1
            rankingDados.splice(i,0,usuarioFinal)
            return
        }

    }
}

const resetarJogo = () =>{
    voltarTelaInicial()
    pintaCelula(posicoesExplodidas_ini)
    posicoesExplodidas_ini= []
    posicoesExplodidasUsadas_ini = []
    qtdTiroEspecial_ini = 1
    pontosJogador_usu = 0
    tiroEspecial_usu = false
    
    //resetar tudo do inimigo
    pintaCelula(posicoesExplodidas_usu)
    posicoesExplodidas_usu= []
    posicoesExplodidasUsadas_usu = []
    qtdTiroEspecial_usu = 1
    pontosJogador_ini = 0
    tiroEspecial_ini = false

    resetEmbarcacoes()
    resetEmbarcacoes_inimigo()
    resetarMarcas();
    iniciarFuncoesBatalha = false
    document.getElementById('tabuleiro-jogador').innerHTML = ""
    document.getElementById('tabuleiroBatalha1').innerHTML = ""
    document.getElementById('tabuleiroBatalha2').innerHTML = ""
    setAlert(0,"",0)
}

