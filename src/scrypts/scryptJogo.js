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

const setAlert = (ativo)=>{
    if(ativo == 0){
        document.getElementById('alerta').style.display='none'
    }else{
        document.getElementById('alerta').style.display='block'
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
        setAlert(1)

    }else{
        //fazer verificacao
        sequencia = gerarSequencia(posInicial, posFinal)
         //fazer verificacao se é aceitavel a posicao
        for(let pos of sequencia){
             document.getElementById(pos).style.backgroundColor = "#000"
        }
        setAlert(0)
    }
}


//Recebe a posciao inicial A1 e final A5 depois de filtrada e gera um array: A1 A2 A3 A4 A5

const gerarSequencia = (posInicial, posFinal) => {
    posInicial = posInicial.split('')
    posFinal = posFinal.split('')
    const letras = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O"]

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