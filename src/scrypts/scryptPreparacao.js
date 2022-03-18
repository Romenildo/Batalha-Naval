let posicoesOcupadas_usu = []
let posicoesOcupadas_ini = []
let LINHAS;
let COLUNAS;
let TAMANHO_TABELA;

let Embarcacoes = [
    {//usuario
        porta_aviao: [],
        navio_tanque : [],
        contra_torpedeiro : [],
        submarino_ : []
    },
    {//inimigo
        porta_aviao: [],
        navio_tanque : [],
        contra_torpedeiro : [],
        submarino_ : []
    }
]

//criacao da tabela com html e js (tamanhos 10 ou 15)
const criarTabela = (tamanho, local, _extensao)=>{
   
    TAMANHO_TABELA = tamanho;
    if(TAMANHO_TABELA == 10){
        LINHAS = ["A","B","C","D","E","F","G","H","I","J"]
        COLUNAS = ["1","2","3","4","5","6","7","8","9","10"]
    }else{
        LINHAS = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O"]
        COLUNAS = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]
        reformularTelaPara15x15()
    }
    let ativaOnclick = ""
    if(_extensao == "_ini"){
        ativaOnclick = 'onclick="marcarCelula(this)"'
    }

    let tabela = '<table>'
    for(let i = 0; i< TAMANHO_TABELA; i++){
        tabela+= '<tr linha="'+LINHAS[i]+'">'
        for(let j = 0; j<TAMANHO_TABELA; j++){
             tabela+= '<td coluna="'+COLUNAS[j]+'" title="Local: '+LINHAS[i]+COLUNAS[j]+'"id="'+LINHAS[i]+COLUNAS[j]+_extensao+'" '+ativaOnclick+'></td>'
         }
         tabela+= '</tr>'
    }
    tabela+= '</table>'
    if(local == 1){
        //tela preparacao
        document.getElementById('tabuleiro-jogador').innerHTML = tabela
    }
    if(local == 2){
        //tela batalha parte jogador
        document.getElementById('tabuleiroBatalha1').innerHTML = tabela
    }
    if(local == 3){
        //tela batalha parte maquina
        document.getElementById('tabuleiroBatalha2').innerHTML = tabela
    }
    
}

const adicionaEmbarcacao= (tipoEmbarcacao)=>{
    
    let dados =  pegarDadosCampo(tipoEmbarcacao)//pega [1] posInicial [2] posFinal [3] tamanhoEmbarcacao
    let posInicial= dados[0];
    let posFinal = dados[1]; 
    let tamanhoEmbarcacao= dados[2];

    if(posInicial=="" || posFinal==""){
        //se nao tiver nada no campo
        setAlert(1, "ERRO!!! Campo das posições vazio")

    }else if(verificaPosicaoDisponivel(posInicial, posFinal,tamanhoEmbarcacao)==false && verificaQtdEmbarcacoes(tipoEmbarcacao)==false){
    
        let sequencia = gerarSequencia(posInicial, posFinal,10)
        
        desenharEmbarcacaoPreparacao(sequencia)
        adicionaEmbarcacaoNaLista(sequencia, 0)
        sequencia.forEach((valor)=>posicoesOcupadas_usu.push(valor))
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
    if(verificaParametroAceitavel(posInicial,posFinal)){      
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

//botao reset preparacao(resetar os dados escolhidos pelo usuario)
const resetEmbarcacoes = () =>{
    portaAviao = 1
    navioTanque = 2;
    contratorpedeiro = 3;
    submarino = 4;
    qtd_portaAviao.innerHTML= qtdEmbarcacoes[1]
    qtd_navioTanque.innerHTML= qtdEmbarcacoes[2]
    qtd_contratorpedeiro.innerHTML= qtdEmbarcacoes[3]
    qtd_submarino.innerHTML= qtdEmbarcacoes[4]

    pintaCelula(posicoesOcupadas_usu)

    posicoesOcupadas_usu = []
    Embarcacoes[0].porta_aviao = []
    Embarcacoes[0].navio_tanque = []
    Embarcacoes[0].contra_torpedeiro = []
    Embarcacoes[0].submarino_ = []
    setAlert(0)
}

//botao voltar
const voltarEscolherTamanho = () =>{
    resetEmbarcacoes()
    voltarTelaEscolherTamanho()
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



//FUNÇÕES ADICIONAIS

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
        for(let i = LINHAS.indexOf(posInicial[0]);i <= LINHAS.indexOf(posFinal[0]);i++){
            resultado.push(LINHAS[i]+posInicial[1])
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
    //pegar os dados do input visual
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

const pintaCelula = (sequencia) =>{
    sequencia = sequencia.map(e => e + "_usu")
    for(let pos of sequencia){
        document.getElementById(pos).style.background= 'url("src/dados/imgs_Embarcacoes/azul.png")'
   }
}

//VERIFICACOES

const verificaParametroIguais = (posInicial, posFinal) =>{
    if(posInicial.toString() == posFinal.toString()){
        setAlert(1,"ERRO!!! As posicoes nao podem estar iguais")
        return true
    }
    return false;
}

const verificaParametroAceitavel = (posInicial, posFinal, TAMANHO_TABELA) =>{
    if(posInicial[1]>TAMANHO_TABELA || posFinal[1]>TAMANHO_TABELA || LINHAS.includes(posInicial[0])!=true || LINHAS.includes(posFinal[0])!=true){
        //verifica se ta dentro dos parametros da  tabela
        setAlert(1,"ERRO!!! Parametro maior que o tamanho da Tabela")
        return true
    }
    return false
}
const verificaParametroMaior= (posInicial, posFinal) =>{
    if(LINHAS.indexOf(posInicial[0]) > LINHAS.indexOf(posFinal[0])){
        setAlert(1, "ERRO!!! Inicio maior ou igual ao Final")
        return true
    }
    return false
}

const verificaLocalDisponivel = (posicoes)=>{
    let encontrou = false;
    posicoes.forEach((XX)=>{
	    if(posicoesOcupadas_usu.includes(XX)){
            encontrou = true;
        }
    })
    if(encontrou == true){
        setAlert(1, "ERRO!!! Posicao ja esta sendo ocupado")
        return true
    }
    return false
}
const verificaLocalDisponivel_ini = (posicoes)=>{
    let encontrou = false;
    posicoes.forEach((XX)=>{
	    if(posicoesOcupadas_ini.includes(XX)){
            encontrou = true;
        }
    })
    if(encontrou == true){
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

//FIM

const adicionaEmbarcacaoNaLista = (embarcacao, extensao) => {
    //1 inimigo, 0 aliado
    switch(embarcacao.length){
        case 5:
            Embarcacoes[extensao].porta_aviao.push(embarcacao)
            break
        case 4:
            Embarcacoes[extensao].navio_tanque.push(embarcacao)
            break
        case 3:
            Embarcacoes[extensao].contra_torpedeiro.push(embarcacao)
            break
        case 2:
            Embarcacoes[extensao].submarino_.push(embarcacao)
            break
    }
}

const desenharEmbarcacaoPreparacao = (sequencia) =>{ 
    let orientacao = []
    orientacao[0] = sequencia[0].split("")[0]
    orientacao[1] = sequencia[1].split("")[0]
    sequencia = sequencia.map(e => e + "_usu")

    if(orientacao[0] === orientacao[1]){
        //horizontal
        switch(sequencia.length){
            case 5:
                document.getElementById(sequencia[0]).style.background= 'url("src/dados/imgs_Embarcacoes/portaaviao1.png")'
                document.getElementById(sequencia[1]).style.background= 'url("src/dados/imgs_Embarcacoes/portaaviao2.png")'
                document.getElementById(sequencia[2]).style.background= 'url("src/dados/imgs_Embarcacoes/portaaviao3.png")'
                document.getElementById(sequencia[3]).style.background= 'url("src/dados/imgs_Embarcacoes/portaaviao4.png")'
                document.getElementById(sequencia[4]).style.background= 'url("src/dados/imgs_Embarcacoes/portaaviao5.png")'
                break;
            case 4:
                document.getElementById(sequencia[0]).style.background= 'url("src/dados/imgs_Embarcacoes/naviotanque1.png")'
                document.getElementById(sequencia[1]).style.background= 'url("src/dados/imgs_Embarcacoes/naviotanque2.png")'
                document.getElementById(sequencia[2]).style.background= 'url("src/dados/imgs_Embarcacoes/naviotanque3.png")'
                document.getElementById(sequencia[3]).style.background= 'url("src/dados/imgs_Embarcacoes/naviotanque4.png")'
                break;
            case 3:
                document.getElementById(sequencia[0]).style.background= 'url("src/dados/imgs_Embarcacoes/contratorpedeiro1.png")'
                document.getElementById(sequencia[1]).style.background= 'url("src/dados/imgs_Embarcacoes/contratorpedeiro2.png")'
                document.getElementById(sequencia[2]).style.background= 'url("src/dados/imgs_Embarcacoes/contratorpedeiro3.png")'
                break;
            case 2:
                document.getElementById(sequencia[0]).style.background= 'url("src/dados/imgs_Embarcacoes/submarino1.png")'
                document.getElementById(sequencia[1]).style.background= 'url("src/dados/imgs_Embarcacoes/submarino2.png")'
                break;
        }
    }else{
        //vertical
        switch(sequencia.length){
            case 5:
                document.getElementById(sequencia[0]).style.background= 'url("src/dados/imgs_Embarcacoes/v_portaaviao1.png")'
                document.getElementById(sequencia[1]).style.background= 'url("src/dados/imgs_Embarcacoes/v_portaaviao2.png")'
                document.getElementById(sequencia[2]).style.background= 'url("src/dados/imgs_Embarcacoes/v_portaaviao3.png")'
                document.getElementById(sequencia[3]).style.background= 'url("src/dados/imgs_Embarcacoes/v_portaaviao4.png")'
                document.getElementById(sequencia[4]).style.background= 'url("src/dados/imgs_Embarcacoes/v_portaaviao5.png")'
                break;
            case 4:
                document.getElementById(sequencia[0]).style.background= 'url("src/dados/imgs_Embarcacoes/v_naviotanque1.png")'
                document.getElementById(sequencia[1]).style.background= 'url("src/dados/imgs_Embarcacoes/v_naviotanque2.png")'
                document.getElementById(sequencia[2]).style.background= 'url("src/dados/imgs_Embarcacoes/v_naviotanque3.png")'
                document.getElementById(sequencia[3]).style.background= 'url("src/dados/imgs_Embarcacoes/v_naviotanque4.png")'
                break;
            case 3:
                document.getElementById(sequencia[0]).style.background= 'url("src/dados/imgs_Embarcacoes/v_contratorpedeiro1.png")'
                document.getElementById(sequencia[1]).style.background= 'url("src/dados/imgs_Embarcacoes/v_contratorpedeiro2.png")'
                document.getElementById(sequencia[2]).style.background= 'url("src/dados/imgs_Embarcacoes/v_contratorpedeiro3.png")'
                break;
            case 2:
                document.getElementById(sequencia[0]).style.background= 'url("src/dados/imgs_Embarcacoes/v_submarino1.png")'
                document.getElementById(sequencia[1]).style.background= 'url("src/dados/imgs_Embarcacoes/v_submarino2.png")'
                break;
        }
    }
    
}