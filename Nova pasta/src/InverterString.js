function InverterStringPilha(str){
    const stack = [];
    stack.push(...str)
    stack.reverse()
    console.log(stack)
}
export default InverterStringPilha;
InverterStringPilha('Eduarda')