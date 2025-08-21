import React, { useState } from 'react'

function consta() {
    const [contador, setContador] = useState(0)

   function incrementar(){
        setContador(contador++)
    }
  return (
    <div>
        <p>Valor: {contador}</p>
        <button onClick={incrementar}>Incrementar</button>
    </div>
  )
}

export default consta