
let posicoesOcupadas = []
const letras10 = ["A","B","C","D","E","F","G","H","I","J"]
const letras15 = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O"]

//criacao da tabela com html e js
const criarTabela = (tipo)=>{
    let linhas;
    let colunas;

    if(tipo == 10){
        linhas = ["A","B","C","D","E","F","G","H","I","J"]
        colunas = ["1","2","3","4","5","6","7","8","9","10"]
        
    }else{
        linhas = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O"]
        colunas = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]
    }

    let tabela = '<table>'
    for(let i = 0; i< tipo; i++){
        tabela+= '<tr linha="'+linhas[i]+'">'
        for(let j = 0; j<tipo; j++){
             tabela+= '<td coluna="'+colunas[j]+'" title="'+linhas[i]+colunas[j]+' livre"id="'+linhas[i]+colunas[j]+'"></td>'
         }
         tabela+= '</tr>'
    }
    tabela+= '</table>'
    document.getElementById('tabuleiro-jogador').innerHTML = tabela
}

criarTabela(10)

const setAlert = (ativo, mensagem = "")=>{
    if(ativo == 0){
        document.getElementById('alerta').style.display='none'
    }else{
        document.getElementById('alerta').style.display='block'
        document.getElementById('alerta').innerHTML = mensagem
    }
}
//adicionar as embarcacoes
const adicionaPortaAviao= (tipo)=>{
    let posInicial;
    let posFinal; 
    let sequencia = []

    switch(tipo){
        case 1:
            //portaAviao
            posInicial = document.getElementById('campoPortaAviao1').value.toUpperCase()
            posFinal = document.getElementById('campoPortaAviao2').value.toUpperCase()
            break
        case 2:
            posInicial = document.getElementById('campoNavioTanque1').value.toUpperCase()
            posFinal = document.getElementById('campoNavioTanque2').value.toUpperCase()
            break
        case 3:
            posInicial = document.getElementById('campoContratorpedeiros1').value.toUpperCase()
            posFinal = document.getElementById('campoContratorpedeiros2').value.toUpperCase()
            break
        case 4:
            posInicial = document.getElementById('campoSubmarino1').value.toUpperCase()
            posFinal = document.getElementById('campoSubmarino2').value.toUpperCase()
            break
    }

    if(posInicial=="" || posFinal==""){
        //se nao tiver nada no campo
        setAlert(1, "ERRO!!! Campo das posições vazio")

    }else if(verificaPosicaoDisponivel(posInicial, posFinal, tipo, 10)==false){
        //fazer verificacao
        sequencia = gerarSequencia(posInicial, posFinal,10)
         //fazer verificacao se é aceitavel a posicao
        for(let pos of sequencia){
             document.getElementById(pos).style.backgroundColor = "#000"
        }
        posicoesOcupadas.push(sequencia)
        setAlert(0)
    }
}


//Recebe a posciao inicial A1 e final A5 depois de filtrada e gera um array: A1 A2 A3 A4 A5

const gerarSequencia = (posInicial, posFinal, tamanhoTabela) => {
    let letras = []
    posInicial = posInicial.split('')
    posFinal = posFinal.split('')
    //Caso valor seja maior qu e9 ex: A10 A12
    posFinal[2]==undefined?posFinal[1]=posFinal[1]:posFinal[1]+=posFinal[2]
    posInicial[2]==undefined?posInicial[1]=posInicial[1]:posInicial[1]+=posInicial[2]

    tamanhoTabela==10?letras=letras10:letras=letras15

    let resultado=[];
 
    if(posInicial[0] == posFinal[0]){
        //horizontal
        for(let l of letras){
            if(l == posInicial[0]){
                for(let i = posInicial[1]; i<=posFinal[1]; i++){
                    resultado.push(l+i)
                }
            }
        }
    }else{
        //vertical
        for(let i = posInicial[1]; i<=posFinal[1]; i++){
            for(let l in letras){
                if(letras[l] == posInicial[0]){
                    let x = l;
                    while(letras[x]!=posFinal[0]){
                        resultado.push(letras[x]+i)
                        x++; 
                    }
                    resultado.push(letras[x]+i)
                }
            }
        }
    }
    
    return resultado;
}

//verificar se a posicao passada é valida
const verificaPosicaoDisponivel=(posInicial, posFinal,tipo,tamanhoTabela)=>{
    let tabela = []
    posInicial = posInicial.split('')
    posFinal = posFinal.split('')
    //Caso valor seja maior qu e9 ex: A10 A12
    posFinal[2]==undefined?posFinal[1]=posFinal[1]:posFinal[1]+=posFinal[2]
    posInicial[2]==undefined?posInicial[1]=posInicial[1]:posInicial[1]+=posInicial[2]
    //dps fazer uma funcao para tirar essa repeticao de codigo(coloca pra fazer no posinicial dps no posFinal numa funcao so)

    tamanhoTabela==10?tabela=letras10:tabela=letras15

    //se os dois forem iguais
    if(posInicial.toString() == posFinal.toString()){
        setAlert(1,"ERRO!!! As posicoes nao podem estar iguais")
        return true
    }
    //verificar se o valor passado esta dentro do tamanho da tabela
    if(posInicial[1]>tamanhoTabela || posFinal[1]>tamanhoTabela || tabela.includes(posInicial[0])!=true || tabela.includes(posFinal[0])!=true){
        //verifica se ta na dentro dos parametros da  tabela
        setAlert(1,"ERRO!!! Parametro maior que o tamanho da Tabela")
        return true
    }

    alert(tabela.indexOf(posInicial[0]) >= tabela.indexOf(posFinal[0]))
    //verificacao se o 1 parametro é maior que o segundo(j1 a1))
    if(posInicial[1]>posFinal[1] && tabela.indexOf(posInicial[0]) >= tabela.indexOf(posFinal[0])){//falta fazer ou letra maior j e a
        setAlert(1, "ERRO!!! Inicio maior ou igual ao Final")
        return true
    }
    //verificacao de tipo da embarcacao 

    return false
}