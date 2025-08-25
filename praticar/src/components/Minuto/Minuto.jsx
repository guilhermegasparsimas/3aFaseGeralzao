import React, { useState } from 'react'

const Minuto = () => {
    const [int, setInt] = useState(0)
    const [seg, setSeg] = useState(0)

  return (
    <>
    <h1>Converter minutos em segundos!</h1>
    <div>
        <label>Quantos minutos você quer converter?</label>
        <input type="text" placeholder='minutos...' onChange={(e)=> setInt(e.target.value)} />
        <button onClick={Converter}>Converter</button>
    </div>
    </>
)
}

export default Minuto