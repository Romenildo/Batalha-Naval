
criarTabela(15,2)
criarTabela(15,3)


let marcacoes = 0;
let posicoesAtaque = [0,0,0]

posicoesOcupadas = ["A1", "A2", "A3"]
const marcarCelula = (div) =>{
    let id = div.id


    document.getElementById(id).innerHTML = "X"

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
        posicoesAtaque[marcacoes] = id
        marcacoes++
    }
    alert(posicoesAtaque)
    
    if(marcacoes == 3){

        for(let i = 0; i<3; i++){
            if(posicoesOcupadas.includes(posicoesAtaque[i])){
                //encontrou bomba
                document.getElementById(posicoesAtaque[i]).style.backgroundColor = "black"
            }else{
                document.getElementById(posicoesAtaque[i]).style.backgroundColor = "red"
            }
            document.getElementById(posicoesAtaque[i]).innerHTML = ""

        }
        marcacoes = 0;
    }


}
