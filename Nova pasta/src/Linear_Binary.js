// function LinearSearch(array, target){
//   const indices = [];
//   for(let i=0; i<array.length; i++){
//     if(array === target){
//         console.log(i);
//         indices.push(i)
//     }
//   }
// }

// export default LinearSearch;
// LinearSearch([1, 2, 3, 4, 5], 4 )

function binary(array, target){
    const result = [];
    const newArray = [].concat(...array)
    console.log(newArray)
    for(i=0; i<newArray; i++){
        if(newArray === target){
            result.push(i)
        }
    }
    console.log(i)
}

export default binary;
binary([1, 2, 3, 4, 5, 6],3,4,5[1,2,3,4,5,6],[,1,2,3,4], 4);