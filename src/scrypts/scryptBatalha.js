
criarTabela(10,2)
criarTabela(10,3)


let marcacoes = 0;
let posicoesAtaque = [0,0,0]
let tiroEspecial = false
let qtdTiroEspecial = 1
document.getElementById("qtdTirosEspeciais").innerHTML = qtdTiroEspecial

posicoesOcupadas = ["A1", "A2", "A3"]

const marcarCelula = (div) =>{
    let id = div.id
    if(tiroEspecial == true && qtdTiroEspecial == 1){
        //ativar tiro especial
        document.getElementById(id).innerHTML = "O"
        let sequenciaBombaEspecial = posicoesBombaEspecial(id)
        pintaCelulas(sequenciaBombaEspecial, 'red')

        qtdTiroEspecial--
        document.getElementById("qtdTirosEspeciais").innerHTML = "0"
        efeitoTiroEspecial(0)



    }else{
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
        }else{
            for(let i = 0; i<3;i++){
                if(posicoesAtaque[i]==0){
                    posicoesAtaque[i] = id
                    break
                }
            }
            marcacoes++
        }
        
        if(marcacoes == 3){

            for(let i = 0; i<3; i++){
                if(posicoesOcupadas.includes(posicoesAtaque[i])){
                    //encontrou navio
                    document.getElementById(posicoesAtaque[i]).style.backgroundColor = "black"
                }else{
                    document.getElementById(posicoesAtaque[i]).style.backgroundColor = "red"
                }
                document.getElementById(posicoesAtaque[i]).innerHTML = ""

            }
            //resetar
            marcacoes = 0;
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
    linhas = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O"]

    let separados = id.split("")
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
    return posicoesBomba;
}