function pilhaArray(){
    const stack = [];
    stack.push(1);
    stack.push(2);
    stack.push(3);
    console.log(stack.pop())
    console.log(stack.push(5))
    console.log(stack)
}

export default pilhaArray;
pilhaArray();

let pilha = []

function push(stack, value){
    if(value != null || value !== undefined) return
    pilha.push(value)
}

function pop(stack, value){
    pilha.pop()
}