import React, { useState } from 'react'


const Soma = () => {
    const [n1, setN1] = useState(0)
    const [n2, setN2] = useState(0)
    const [soma, setSoma] = useState(0)
    function Soma() {
        let resultado = Number(n1) + Number(n2)

        setSoma(resultado)
    }
    return (
        <>
            <h2>Soma de dois números!</h2>
            <div className='div-soma' >
                <input type="text" placeholder='N1' onChange={(e) => setN1(e.target.value)} /> +
                <input type="text" placeholder='N2' onChange={(e) => setN2(e.target.value)} />
                <button onClick={Soma} >Somar</button>
            </div>
            Resultado = {soma}
        </>
    )
}

export default Soma