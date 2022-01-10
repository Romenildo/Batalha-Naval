
let contadorMarcas = 0;
let posicoesMarcas = [0,0,0]
let tiroEspecial = false
let iniciarFuncoesBatalha = false
//visual
let qtdTiroEspecial = 1
let pontosJogador = 0
const qtdTirosNormais = 3
let posicoesExplodidas = [];


const tiros_especiais = document.getElementById("qtdTirosEspeciais")
tiros_especiais.innerHTML = qtdTiroEspecial

const pontos_jogador = document.getElementById("pontosJogador")
pontos_jogador.innerHTML = pontosJogador

const tiros_Normais = document.getElementById("qtdTirosNormais")
tiros_Normais.innerHTML = qtdTirosNormais




// quantidade das embarcacoes restantes na batalha
const qtdPortaAviaoBatalha = document.getElementById("qtdPortaAviao")
const qtdNavioTanqueBatalha = document.getElementById("qtdNavioTanque")
const qtdContratorpedeiroBatalha = document.getElementById("qtdContratorpedeiro")
const qtdSubmarinoBatalha = document.getElementById("qtdSubmarino")

let portaAviaoRestante;
let navioTanqueRestante;
let contratorpedeiroRestante;
let submarinoRestante;



const marcarCelula = (div) =>{
    if(iniciarFuncoesBatalha==false){
        return 
    }

    let id = div.id
    //caso clicar na celula ja vermelha explodida
    if(posicoesExplodidas.includes(id)){
        return
    }
    
    if(tiroEspecial == true && qtdTiroEspecial > 0){
        //ativar tiro especial
        let sequenciaBombaEspecial = posicoesBombaEspecial(id)

        pintarCelulasTiro(sequenciaBombaEspecial)
        adicionarPosicoesExplodidas(sequenciaBombaEspecial)
        verificarSeEmbarcacaoCompleta()
        tiros_especiais.innerHTML = --qtdTiroEspecial
        efeitoTiroEspecial(0)
        verificarFinalizarPartida()
        
    }else{
        //tiro normal
        efeitoTiroEspecial(0)
        document.getElementById(id).style.background= "radial-gradient(red, #1E88E5,#1E88E5)"
        
        //somar os 3 cliques das bombas
        if(posicoesMarcas.includes(id)){
            //caso clicar no mesmo novamente
            document.getElementById(id).style.background= "radial-gradient(#1E88E5, #1E88E5)"

            posicoesMarcas.forEach((nome, indice)=>{
                if(nome == id){
                    posicoesMarcas[indice] = 0
                }
            })
            contadorMarcas--
            tiros_Normais.innerHTML = qtdTirosNormais - contadorMarcas
        }else{
            for(let i = 0; i<qtdTirosNormais;i++){
                if(posicoesMarcas[i]==0){
                    posicoesMarcas[i] = id
                    break
                }
            }
            contadorMarcas++
            tiros_Normais.innerHTML = qtdTirosNormais - contadorMarcas
        }
        
        //atirar nos 3
        if(contadorMarcas == qtdTirosNormais){
            pintarCelulasTiro(posicoesMarcas)
            adicionarPosicoesExplodidas(posicoesMarcas)
            verificarSeEmbarcacaoCompleta()
            verificarFinalizarPartida()
            //resetar
            resetarMarcas()
        }
    }
}



const posicoesBombaEspecial= (id)=>{
    //sequencia ao redor da explosao
    //           X  X  X 
    //           X  O  X
    //           X  X  X 
    linhas.push("0")
    linhas.unshift("0")

    let posicoes = gerarPosicao(id)
    let posicoesBomba = []

    for(let i = 0; i< linhas.length; i++){
        if(linhas[i]==posicoes[0]){
            for(let j = i-1; j<i+2;j++){
                for(let k = posicoes[1]-1;k<parseInt(posicoes[1])+2;k++){
                    posicoesBomba.push(linhas[j]+k)
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
    criarTabela(tamanhoTabela,2)
    criarTabela(tamanhoTabela,3)
    window.clearInterval(cronometro_timer);
    if(tamanhoTabela == 10){
        cronometro(19)
    }else{
        cronometro(29)
    }
    adicionarQtdEmbarcacoesBatalha()

}



const adicionarQtdEmbarcacoesBatalha = ()=>{

    portaAviaoRestante = Embarcacoes.porta_aviao.length
    navioTanqueRestante= Embarcacoes.navio_tanque.length
    contratorpedeiroRestante = Embarcacoes.contra_torpedeiro.length
    submarinoRestante= Embarcacoes.submarino_.length

    qtdPortaAviaoBatalha.innerHTML = portaAviaoRestante
    qtdNavioTanqueBatalha.innerHTML = navioTanqueRestante
    qtdContratorpedeiroBatalha.innerHTML = contratorpedeiroRestante
    qtdSubmarinoBatalha.innerHTML =  submarinoRestante
    
}
//FUNCOES ADICIONAIS

const resetarMarcas = ()=>{
    contadorMarcas = 0;
    tiros_Normais.innerHTML = qtdTirosNormais - contadorMarcas
    for(let i = 0; i<3;i++){
        posicoesMarcas[i] = 0
    }
}

const efeitoTiroEspecial = (ativo)=>{
        const container = document.getElementById('container')
    if(ativo == 1 && qtdTiroEspecial > 0){
        tiroEspecial = true
        colocarGradient("linear-gradient(45deg, rgb(243, 90, 19),rgb(238, 14, 14),rgb(236, 225, 120),#fff)")
    }else{
        tiroEspecial = false
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
        let posiceos = gerarPosicao(e)
        //fazer a troca para o tabuleiro 15
        if(posiceos[0] == 0 || posiceos[0] == tamanhoTabela+1 || posiceos[1]== 0 || posiceos[1] == tamanhoTabela+1){
            return "00"
        }
        return e 
    })

    return posicoesFiltrada
}

const pintarCelulasTiro = (sequencia) =>{

    for(let i = 0; i<sequencia.length; i++){
        if(sequencia[i]!= "00"){
             if(posicoesOcupadas.includes(sequencia[i])){
                 //encontrou navio
                 document.getElementById(sequencia[i]).style.background= "radial-gradient(#000, #000)"
                 
                 pontos_jogador.innerHTML = pontosJogador += 500
             }else{
                document.getElementById(sequencia[i]).style.background= "radial-gradient(red, red)"
             }
             document.getElementById(sequencia[i]).innerHTML = ""
        }
     }
}

const adicionarPosicoesExplodidas = (posicoes)=>{
    for(let n = 0; n < posicoes.length; n++){
        posicoesExplodidas.push(posicoes[n])
    }
}


// Diminuir a quantidade de embarcacoes restantes ao emcontralar na partida
const verificarSeEmbarcacaoCompleta = () =>{
       verificarPorTipoEmbarcacao(Embarcacoes.porta_aviao)
       verificarPorTipoEmbarcacao(Embarcacoes.navio_tanque)
       verificarPorTipoEmbarcacao(Embarcacoes.contra_torpedeiro)
       verificarPorTipoEmbarcacao(Embarcacoes.submarino_)
   
}

let posicoesExplodidasUsadas = []
const verificarPorTipoEmbarcacao = (Embarcacao) =>{

    let AuxPosicoesExplodidas = posicoesExplodidas.slice()
    for(let i =0; i < posicoesExplodidasUsadas.length;i++){
        AuxPosicoesExplodidas.splice(AuxPosicoesExplodidas.indexOf(posicoesExplodidasUsadas[i]), 1);
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
            diminuirEmbarcacaoNaBatalha(quant)
            for(let k = 0; k < embarcacaoAtual.length;k++){
                posicoesExplodidasUsadas.push(embarcacaoAtual[k])
            }
        }
   }
}

const diminuirEmbarcacaoNaBatalha = (tamanho) =>{
     if(tamanho == 5 && portaAviaoRestante > 0){
        qtdPortaAviaoBatalha.innerHTML = --portaAviaoRestante
        return
     }
     if(tamanho == 4 && navioTanqueRestante > 0){
        qtdNavioTanqueBatalha.innerHTML = --navioTanqueRestante
        return
     }
     if(tamanho == 3 && contratorpedeiroRestante > 0){
        qtdContratorpedeiroBatalha.innerHTML = --contratorpedeiroRestante
        return
     }
     if(tamanho == 2 && submarinoRestante > 0){
        qtdSubmarinoBatalha.innerHTML = --submarinoRestante
        return
     }
     
}

//finalizar partida
const verificarFinalizarPartida = ()=>{
    let embarcacoesRestantes = portaAviaoRestante+ navioTanqueRestante + contratorpedeiroRestante + submarinoRestante
    if(embarcacoesRestantes <= 0){
        adicionarUsuarioAoRanking()
        alert(`Parabens!!! ${nomeUsuarioAtual} Você ganhou  a batalha!`)
        voltarTelaInicial()
        resetarJogo()
        return
    }
    //fazzer a finaliacao com cronometro tbm
}


const adicionarUsuarioAoRanking = () =>{

    let pontosFinal = pontosJogador
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
        tempoRestante : "15:00"
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
    pintaCelulas(posicoesExplodidas, "#1E88E5")
    posicoesExplodidas= []
    posicoesExplodidasUsadas = []
    
    resetEmbarcacoes()
    resetarMarcas();
}