

const iniciarBatalha=()=>{
    mostrarTelaBatalha()
    criarTabela(10,2)
    criarTabela(10,3)
}

let marcacoes = 0;
let posicoesAtaque = [0,0,0]
let tiroEspecial = false
let qtdTiroEspecial = 1
document.getElementById("qtdTirosEspeciais").innerHTML = qtdTiroEspecial

let pontosJogador = 0
const pontos_jogador = document.getElementById("pontosJogador")
pontos_jogador.innerHTML = pontosJogador

const qtdTirosNormais = 3
const tiros_Normais = document.getElementById("qtdTirosNormais")
tiros_Normais.innerHTML = qtdTirosNormais


const marcarCelula = (div) =>{
    let id = div.id
    if(tiroEspecial == true && qtdTiroEspecial == 1){
        //ativar tiro especial
        document.getElementById(id).innerHTML = "O"
        let sequenciaBombaEspecial = posicoesBombaEspecial(id)

        for(let i = 0; i<sequenciaBombaEspecial.length; i++){
        
           if(sequenciaBombaEspecial[i]!= "00"){
                if(posicoesOcupadas.includes(sequenciaBombaEspecial[i])){
                    
                    //encontrou navio
                    document.getElementById(sequenciaBombaEspecial[i]).style.backgroundColor = "black"
                    pontos_jogador.innerHTML = pontosJogador += 500
                }else{
                    document.getElementById(sequenciaBombaEspecial[i]).style.backgroundColor = "red"
                }
                document.getElementById(sequenciaBombaEspecial[i]).innerHTML = ""
           }

        }
        
        document.getElementById("qtdTirosEspeciais").innerHTML = --qtdTiroEspecial
        efeitoTiroEspecial(0)

    }else{
        //tiro normal
        efeitoTiroEspecial(0)
        document.getElementById(id).innerHTML = "X"

        //somar os 3 cliques das bombas
        if(posicoesAtaque.includes(id)){
            //caso clicar no mesmo novamente
            document.getElementById(id).innerHTML = ""
            posicoesAtaque.forEach((nome, indice)=>{
                if(nome == id){
                    posicoesAtaque[indice] = 0
                }
            })
            marcacoes--
            tiros_Normais.innerHTML = qtdTirosNormais - marcacoes
        }else{
            for(let i = 0; i<3;i++){
                if(posicoesAtaque[i]==0){
                    posicoesAtaque[i] = id
                    break
                }
            }
            marcacoes++
            
            tiros_Normais.innerHTML = qtdTirosNormais - marcacoes
        }
        
        if(marcacoes == 3){

            for(let i = 0; i<3; i++){
                if(posicoesOcupadas.includes(posicoesAtaque[i])){
                    //encontrou navio
                    document.getElementById(posicoesAtaque[i]).style.backgroundColor = "black"
                    pontos_jogador.innerHTML = pontosJogador += 500
                }else{
                    document.getElementById(posicoesAtaque[i]).style.backgroundColor = "red"
                }
                document.getElementById(posicoesAtaque[i]).innerHTML = ""

            }
            //resetar
            marcacoes = 0;
            tiros_Normais.innerHTML = qtdTirosNormais - marcacoes
            for(let i = 0; i<3;i++){
                posicoesAtaque[i] = 0
            }
        }
    }
}

const efeitoTiroEspecial = (ativo)=>{
    const container = document.getElementById('container')
    if(ativo == 1){
        tiroEspecial = true
        container.style.background = "linear-gradient(45deg, rgb(243, 90, 19),rgb(238, 14, 14),rgb(236, 225, 120),#fff)"
        container.style.animation = "colors 8s ease infinite"
        container.style.backgroundSize = "300% 300%"
    }else{
        tiroEspecial = false
        container.style.background = "linear-gradient(45deg, rgb(10, 48, 151),rgb(93, 187, 190),rgb(182, 230, 245),#fff)"
        container.style.animation = "colors 8s ease infinite"
        container.style.backgroundSize = "300% 300%"
    }
    
}

const posicoesBombaEspecial= (id)=>{

    //sequencia ao redor da explosao
    //           X  X  X  X
    //           X  O  O  X
    //           X  X  X  X
    linhas = ["0","A","B","C","D","E","F","G","H","I","J","0"]//somente com tamanho 10x10

    let separados =gerarPosicao(id)
    let posicoesBomba = []

    for(let i = 0; i< linhas.length; i++){
        if(linhas[i]==separados[0]){
            for(let j = i-1; j<i+2;j++){
                for(let k = separados[1]-1;k<parseInt(separados[1])+2;k++){
                    posicoesBomba.push(linhas[j]+k)
                }

            }
            break
        }
    }
    posicoesBomba = filtrarPosicoesBombaEspecial(posicoesBomba)
    return posicoesBomba;
}

const filtrarPosicoesBombaEspecial = (sequencia)=>{
    //caso a bomba esteja em um dos cantos do tabueiro, acender somente os que estao dentro do tabuleiro

    const posicoesFiltrada = sequencia.map((e)=>
    {
        let separados = gerarPosicao(e)
        //fazer a troca para o tabuleiro 15
        if(separados[0] == 0 || separados[0] == 11 || separados[1]== 0 || separados[1] == 11){
            return "00"
        }
        return e 
    })

    return posicoesFiltrada
}