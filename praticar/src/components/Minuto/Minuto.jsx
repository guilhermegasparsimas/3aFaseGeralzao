import React, { useEffect, useState } from 'react'

const Minuto = () => {
    const [int, setInt] = useState(0)
    const [seg, setSeg] = useState(0)

    function Converter (){
      let minutos = Number(int)
      let conversao = minutos * 60
      setSeg(conversao)
    }
  return (
    <>
    <h1>Converter minutos em segundos!</h1>
    <div className='div-soma' >
        <label>Quantos minutos você quer converter?</label>
        <input type="text" placeholder='minutos...' onChange={(e)=> setInt(e.target.value)} />
        <button onClick={Converter}>Converter</button>
    </div>
    Minutos: {int} <p></p> Segundos: {seg}
    </>
)
}

export default Minuto