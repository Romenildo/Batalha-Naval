
let linhas;
let colunas;

const criarTabela = (tipo)=>{
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

const adicionaPortaAviao= (tipo)=>{
    let posInicial;
    let posFinal; 
    let sequencia = []
    
    if(posInicial=="" || posFinal==""){
        //Alerta erro
    }
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

    sequencia = gerarSequencia(posInicial, posFinal)
     //fazer verificacao se é aceitavel a posicao
    for(let pos of sequencia){
         document.getElementById(pos).style.backgroundColor = "#000"
    }

}

const gerarSequencia = (posInicial, posFinal) => {
    posInicial = posInicial.split('')
    posFinal = posFinal.split('')
    const letras = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O"]

    let resultado=[];
    //somente horizontal
    for(let l of letras){
        if(l == posInicial[0]){
            for(let i = posInicial[1]; i<=posFinal[1]; i++){
                resultado.push(l+i)
                
            }
        }
    }
    return resultado;
}