function LinearSearch(array, target){
  const indices = [];
  const newArray = [...array]
  for(let i=0; i<array.length; i++){
    if(newArray[i] === target){
        console.log(i);
        indices.push(i)
    }
  }
}

export default LinearSearch;
LinearSearch([1, 2, 3, 4, 5], 5 )

