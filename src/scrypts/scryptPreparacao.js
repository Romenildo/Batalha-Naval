

let posicoesOcupadas = []
let linhas;
let colunas;
let tamanhoTabela;

//criacao da tabela com html e js (tamnhos 10 ou 15)
const criarTabela = (tamanho, local)=>{
   
    tamanhoTabela = tamanho;

    if(tamanhoTabela == 10){
        linhas = ["A","B","C","D","E","F","G","H","I","J"]
        colunas = ["1","2","3","4","5","6","7","8","9","10"]
    }else{
        linhas = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O"]
        colunas = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]
        document.getElementById('container').style.height = "800px"
        document.getElementById('tabuleiro-jogador').style.height = "542px"
        document.getElementById('foo').style.marginTop = "87px"
        document.getElementById('tabuleiros').style.height = "550px"

        document.getElementById('tabuleiroBatalha').style.height = "545px"
        document.getElementById('tabuleiroBatalha1').style.height = "542px"
        document.getElementById('tabuleiroBatalha2').style.height = "542px"
        

    }

    let tabela = '<table>'
    for(let i = 0; i< tamanhoTabela; i++){
        tabela+= '<tr linha="'+linhas[i]+'">'
        for(let j = 0; j<tamanhoTabela; j++){
             tabela+= '<td coluna="'+colunas[j]+'" title="'+linhas[i]+colunas[j]+' livre"id="'+linhas[i]+colunas[j]+'" onclick="marcarCelula(this)"></td>'
         }
         tabela+= '</tr>'
    }
    tabela+= '</table>'
    if(local == 1){
        //tela preparacao
        document.getElementById('tabuleiro-jogador').innerHTML = tabela
    }
    if(local == 2){
        //tela batalha parte jgoador
        document.getElementById('tabuleiroBatalha1').innerHTML = tabela
    }
    if(local == 3){
        //tela batalha parte maquina
        document.getElementById('tabuleiroBatalha2').innerHTML = tabela
    }
    
}



//adicionar as embarcacoes
const adicionaEmbarcacao= (tipoEmbarcacao)=>{
    //pega [1] posInicial [2] posFinal [3] tamanhoEmbarcacao
    let dados =  pegarDadosCampo(tipoEmbarcacao)
    let posInicial= dados[0];
    let posFinal = dados[1]; 
    let tamanhoEmbarcacao= dados[2];

    if(posInicial=="" || posFinal==""){
        //se nao tiver nada no campo
        setAlert(1, "ERRO!!! Campo das posições vazio")

    }else if(verificaPosicaoDisponivel(posInicial, posFinal,tamanhoEmbarcacao, 10)==false && verificaQtdEmbarcacoes(tipoEmbarcacao)==false){
    
        let sequencia = gerarSequencia(posInicial, posFinal,10)

        pintaCelulas(sequencia, "#000")

        sequencia.forEach((valor)=>posicoesOcupadas.push(valor))

        //todas as embarcacoes foram colocadas na tabela
        totalEmbarcacoes == 0?setAlert(2, "Tudo pronto para Iniciar a partida"):setAlert(0)
    }
}

//verificar se a posicao passada é valida
const verificaPosicaoDisponivel=(posInicial, posFinal,tamanhoEmbarcacao)=>{
    let posicoes = gerarSequencia(posInicial,posFinal,10)

    posInicial = gerarPosicao(posInicial)
    posFinal = gerarPosicao(posFinal)

    //se os dois forem iguais
    if(verificaParametroIguais(posInicial, posFinal)){
        return true
    }
    //verificar se o valor passado esta dentro do tamanho da tabela
    if(verificaParametroAceitavel(posInicial,posFinal)){        //verifica se ta na dentro dos parametros da  tabela
        return true
    }
    //verificacao se o 1 parametro é maior que o segundo(j1 a1))
    if(verificaParametroMaior(posInicial, posFinal)){
        return true
    }
    //verificar se o local esta disponivel
    if(verificaLocalDisponivel(posicoes)){
        return true;
    }
    //verificacao de tipo da embarcacao (criar um porta aviao no lugar de um submarino)
    if(verificaTamanhoValido(posicoes, tamanhoEmbarcacao)){
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
let totalEmbarcacoes = portaAviao+navioTanque+contratorpedeiro+submarino;

let qtd_portaAviao = document.getElementById('qtd-portaAviao')
let qtd_navioTanque = document.getElementById('qtd-navioTanque')
let qtd_contratorpedeiro = document.getElementById('qtd-contratorpedeiro')
let qtd_submarino = document.getElementById('qtd-submarino')

qtd_portaAviao.innerHTML= qtdEmbarcacoes[portaAviao]
qtd_navioTanque.innerHTML= qtdEmbarcacoes[navioTanque]
qtd_contratorpedeiro.innerHTML= qtdEmbarcacoes[contratorpedeiro]
qtd_submarino.innerHTML= qtdEmbarcacoes[submarino]

const verificaQtdEmbarcacoes= (tipoEmbarcacao)=>{
    if(tipoEmbarcacao== 1 && portaAviao > 0){
        qtd_portaAviao.innerHTML = qtdEmbarcacoes[--portaAviao]
        totalEmbarcacoes--;
        return false
    }
    if(tipoEmbarcacao == 2 && navioTanque > 0){
        qtd_navioTanque.innerHTML = qtdEmbarcacoes[--navioTanque]
        totalEmbarcacoes--;
        return false
    }
    if(tipoEmbarcacao == 3 && contratorpedeiro > 0){
        qtd_contratorpedeiro.innerHTML = qtdEmbarcacoes[--contratorpedeiro]
        totalEmbarcacoes--;
        return false
    }
    if(tipoEmbarcacao == 4 && submarino > 0){
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

    pintaCelulas(posicoesOcupadas, "#1E88E5")

    posicoesOcupadas = []
    setAlert(0)
}

//botao iniciar

const iniciarPartida= () =>{
    iniciarBatalha()
    if(totalEmbarcacoes > 0){
        setAlert(1,"ERRO!!! Todas as Embarcacoes devem ser colocadas")
    }else{
        setAlert(0)
        iniciarBatalha()
    }
}






//FUNÇÕES QUE NGM LIGA COMO SAO FEITAS

//Recebe a posciao inicial A1 e final A5 depois de filtrada e gera um array: A1 A2 A3 A4 A5
const gerarSequencia = (posInicial, posFinal) => {
    posInicial = gerarPosicao(posInicial)
    posFinal = gerarPosicao(posFinal)

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
        for(let i = linhas.indexOf(posInicial[0]);i <= linhas.indexOf(posFinal[0]);i++){
            resultado.push(linhas[i]+posInicial[1])
        }
        return resultado;
    }
    setAlert(1,"ERRO!!! Posicao dos parametros Invalida")
}

const gerarPosicao = (posicao)=>{
    posicao = posicao.split('')
    //caso valor seja maior que 9: ex A10 A12 ele tranforma a 2 posicao no valor 12
    posicao[2]==undefined?posicao[1]=posicao[1]:posicao[1]+=posicao[2]

    return posicao
}

const pegarDadosCampo = (tipoEmbarcacao) =>{

    switch(tipoEmbarcacao){
        case 1://Porta-Aviao
            posInicial = document.getElementById('campoPortaAviao1').value.toUpperCase()
            posFinal = document.getElementById('campoPortaAviao2').value.toUpperCase()
            tamanhoEmbarcacao = 5
            break
        case 2://Navio-Tanque
            posInicial = document.getElementById('campoNavioTanque1').value.toUpperCase()
            posFinal = document.getElementById('campoNavioTanque2').value.toUpperCase()
            tamanhoEmbarcacao = 4
            break
        case 3://lanatorpedeiros
            posInicial = document.getElementById('campoContratorpedeiros1').value.toUpperCase()
            posFinal = document.getElementById('campoContratorpedeiros2').value.toUpperCase()
            tamanhoEmbarcacao = 3
            break
        case 4://submarino
            posInicial = document.getElementById('campoSubmarino1').value.toUpperCase()
            posFinal = document.getElementById('campoSubmarino2').value.toUpperCase()
            tamanhoEmbarcacao = 2
            break
    }
    return [posInicial, posFinal, tamanhoEmbarcacao]
}

const pintaCelulas = (sequencia, cor) =>{
    for(let pos of sequencia){
        document.getElementById(pos).style.backgroundColor = cor
   }
}


const verificaParametroIguais = (posInicial, posFinal) =>{
    if(posInicial.toString() == posFinal.toString()){
        setAlert(1,"ERRO!!! As posicoes nao podem estar iguais")
        return true
    }
    return false;
}

const verificaParametroAceitavel = (posInicial, posFinal, tamanhoTabela) =>{
    if(posInicial[1]>tamanhoTabela || posFinal[1]>tamanhoTabela || linhas.includes(posInicial[0])!=true || linhas.includes(posFinal[0])!=true){
        //verifica se ta dentro dos parametros da  tabela
        setAlert(1,"ERRO!!! Parametro maior que o tamanho da Tabela")
        return true
    }
    return false
}
const verificaParametroMaior= (posInicial, posFinal) =>{
    if(linhas.indexOf(posInicial[0]) > linhas.indexOf(posFinal[0])){
        setAlert(1, "ERRO!!! Inicio maior ou igual ao Final")
        return true
    }
    return false
}

const verificaLocalDisponivel = (posicoes)=>{
    let encontrou = false;
    posicoes.forEach((XX)=>{
	    if(posicoesOcupadas.includes(XX)){
            encontrou = true;
        }
    })
    if(encontrou == true){
        setAlert(1, "ERRO!!! Posicao ja esta sendo ocupado")
        return true
    }
    return false
}

const verificaTamanhoValido = (posicoes, tamanhoEmbarcacao)=>{
    if(posicoes.length != tamanhoEmbarcacao){
        setAlert(1, "ERRO!!! Tamanho da Embarcacao invalida")
        return true
    }
    return false

}