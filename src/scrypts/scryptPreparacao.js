
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

//adicionar as embarcacoes
const adicionaPortaAviao= (tipo)=>{
    let posInicial;
    let posFinal; 
    let tamanhoEmbarcacao;
    let sequencia = []

    switch(tipo){
        case 1:
            //portaAviao
            posInicial = document.getElementById('campoPortaAviao1').value.toUpperCase()
            posFinal = document.getElementById('campoPortaAviao2').value.toUpperCase()
            tamanhoEmbarcacao = 5
            break
        case 2:
            posInicial = document.getElementById('campoNavioTanque1').value.toUpperCase()
            posFinal = document.getElementById('campoNavioTanque2').value.toUpperCase()
            tamanhoEmbarcacao = 4
            break
        case 3:
            posInicial = document.getElementById('campoContratorpedeiros1').value.toUpperCase()
            posFinal = document.getElementById('campoContratorpedeiros2').value.toUpperCase()
            tamanhoEmbarcacao = 3
            break
        case 4:
            posInicial = document.getElementById('campoSubmarino1').value.toUpperCase()
            posFinal = document.getElementById('campoSubmarino2').value.toUpperCase()
            tamanhoEmbarcacao = 2
            break
    }
    if(posInicial=="" || posFinal==""){
        //se nao tiver nada no campo
        setAlert(1, "ERRO!!! Campo das posições vazio")

    }else if(verificaPosicaoDisponivel(posInicial, posFinal,tamanhoEmbarcacao, 10)==false && verificaQtdEmbarcacoes(tipo)==false){
        //fazer verificacao

        sequencia = gerarSequencia(posInicial, posFinal,10)
         //fazer verificacao se é aceitavel a posicao
        for(let pos of sequencia){
             document.getElementById(pos).style.backgroundColor = "#000"
        }
        
        sequencia.forEach((valor)=>posicoesOcupadas.push(valor))
        if(totalEmbarcacoes == 0){
            setAlert(2, "Tudo pronto para Iniciar a partida")
        }else{
            setAlert(0)
        }
        
    
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
        for(let i = posInicial[1]; i<=parseInt(posFinal[1]); i++){
            resultado.push(posInicial[0]+i)
        }
        return resultado;
    }
    if(posInicial[1]==posFinal[1]){
        //vertical
        for(let i = letras.indexOf(posInicial[0]);i <= letras.indexOf(posFinal[0]);i++){
            resultado.push(letras[i]+posInicial[1])
        }
        return resultado;
    }

    setAlert(1,"ERRO!!! Posicao dos parametros Invalida")
}

//verificar se a posicao passada é valida
const verificaPosicaoDisponivel=(posInicial, posFinal,tamanhoEmbarcacao,tamanhoTabela)=>{
    let tabela = []
    let posicoes = []
    posicoes = gerarSequencia(posInicial,posFinal,10)
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
    //verificacao se o 1 parametro é maior que o segundo(j1 a1))
    if(tabela.indexOf(posInicial[0]) > tabela.indexOf(posFinal[0])){
        setAlert(1, "ERRO!!! Inicio maior ou igual ao Final")
        return true
    }
    //verificar se o local esta disponivel
    //consertar ganbiarra****************
    let sim = false;
    posicoes.forEach((valor)=>{
	    if(posicoesOcupadas.includes(valor)){
            sim = true;
        }
    })
    if(sim == true){
        setAlert(1, "ERRO!!! Posicao ja esta sendo ocupado")
        return true
    }
    //verificacao de tipo da embarcacao (criar um porta aviao no lugar de um submarino)
    if(posicoes.length != tamanhoEmbarcacao){
        setAlert(1, "ERRO!!! Tamanho da Embarcacao invalida")
        return true;
    }

    return false
}

//alterar quantidade disponivel de navios
const qtdEmbarcacoes = ["x0", "x1", "x2", "x3", "x4"]

let portaAviao = 1
let navioTanque = 2;
let contratorpedeiro = 3;
let submarino = 4;
let totalEmbarcacoes = 10;

let qtd_portaAviao = document.getElementById('qtd-portaAviao')
let qtd_navioTanque = document.getElementById('qtd-navioTanque')
let qtd_contratorpedeiro = document.getElementById('qtd-contratorpedeiro')
let qtd_submarino = document.getElementById('qtd-submarino')

qtd_portaAviao.innerHTML= qtdEmbarcacoes[portaAviao]
qtd_navioTanque.innerHTML= qtdEmbarcacoes[navioTanque]
qtd_contratorpedeiro.innerHTML= qtdEmbarcacoes[contratorpedeiro]
qtd_submarino.innerHTML= qtdEmbarcacoes[submarino]



const verificaQtdEmbarcacoes= (tipo)=>{
    if(tipo == 1 && portaAviao > 0){
        qtd_portaAviao.innerHTML = qtdEmbarcacoes[--portaAviao]
        totalEmbarcacoes--;
        return false
    }
    if(tipo == 2 && navioTanque > 0){
        qtd_navioTanque.innerHTML = qtdEmbarcacoes[--navioTanque]
        totalEmbarcacoes--;
        return false
    }
    if(tipo == 3 && contratorpedeiro > 0){
        qtd_contratorpedeiro.innerHTML = qtdEmbarcacoes[--contratorpedeiro]
        totalEmbarcacoes--;
        return false
    }
    if(tipo == 4 && submarino > 0){
        qtd_submarino.innerHTML = qtdEmbarcacoes[--submarino]
        totalEmbarcacoes--
        return false
    }
    
    setAlert(1,"ERRO!!! Quantidade da Embarcacao alcancada")
    return true
}
//botao reset
const resetEmbarcacoes = () =>{
    qtd_portaAviao.innerHTML= qtdEmbarcacoes[1]
    qtd_navioTanque.innerHTML= qtdEmbarcacoes[2]
    qtd_contratorpedeiro.innerHTML= qtdEmbarcacoes[3]
    qtd_submarino.innerHTML= qtdEmbarcacoes[4]
    for(let pos of posicoesOcupadas){
        document.getElementById(pos).style.backgroundColor = "#1E88E5"
   }
    posicoesOcupadas = []
    setAlert(0)
}

//botao iniciar

const iniciarPartida= () =>{
    
    if(totalEmbarcacoes > 0){
        setAlert(1,"ERRO!!! Todas as Embarcacoes devem ser colocadas")
    }else{
        setAlert(0)
        alert("partida Iniciada")
    }
}