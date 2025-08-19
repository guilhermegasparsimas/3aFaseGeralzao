function semaforo(cor) {
    if(cor == "Vermelho"){ 
        console.log("Pare")
    } else if(cor == "Amarelo"){
        console.log("Vá Devagar")
    } else if(cor == "Verde") {
        console.log("Prossiga")
    } else{
        console.log("Cor inválida")
    }
}
semaforo("Amarelo")


function salada_de_fruta(){
    const array = []
    console.log(array)
    // array.push("açaí", "cupuaçu")
    array.push([{aluno: "1",nome: "Guilherme"}])
    console.log(array)
}
salada_de_fruta()