
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
        verificarTipoCelula(sequenciaBombaEspecial)
        tiros_especiais.innerHTML = --qtdTiroEspecial
        efeitoTiroEspecial(0)
        
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

            verificarTipoCelula(posicoesMarcas)
            
            adicionarPosicoesExplodidas(posicoesMarcas)
            //resetar
            resetarMarcas()
        }
    }
}

const verificarTipoCelula = (sequencia) =>{
     //verificar qual tipo da embarcacao é a celula
    for(let i = 0; i < sequencia.length; i++){
        removerCelulaDaEmbarcacao(sequencia[i], Embarcacoes.porta_aviao)
        removerCelulaDaEmbarcacao(sequencia[i], Embarcacoes.navio_tanque)
        removerCelulaDaEmbarcacao(sequencia[i], Embarcacoes.contra_torpedeiro)
        removerCelulaDaEmbarcacao(sequencia[i], Embarcacoes.submarino_)
    }
    

}
const removerCelulaDaEmbarcacao = (celula, Embarcacao) =>{
    
    for(let i = 0; i < Embarcacao.length; i++){
        for(let j = 0; j<Embarcacao[i].length; j++){
            if(Embarcacao[i][j] == celula){
                Embarcacao[i][j] = "0"
                return
            }
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
    qtdPortaAviaoBatalha.innerHTML = Embarcacoes.porta_aviao.length
    qtdNavioTanqueBatalha.innerHTML = Embarcacoes.navio_tanque.length
    qtdContratorpedeiroBatalha.innerHTML = Embarcacoes.contra_torpedeiro.length
    qtdSubmarinoBatalha.innerHTML = Embarcacoes.submarino_.length
    
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
