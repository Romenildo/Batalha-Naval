
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
             tabela+= '<td coluna="'+colunas[j]+'" title="'+linhas[i]+colunas[j]+' livre"></td>'
         }
         tabela+= '</tr>'
    }
    tabela+= '</table>'
    document.getElementById('tabuleiro-jogador').innerHTML = tabela
}

criarTabela(10)