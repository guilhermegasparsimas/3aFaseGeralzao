import { useEffect, useState } from "react"
import styles from "./Card.module.css"

export const CardApi = ()=>{
    // let contador = 0
    // const [contador, setContador] = useState(0)

    // const incrementaValor = ()=>{
    //     // contador++
    //     // console.log(contador)
    //     // setContador(contador+1)
    // }

    const [users, setUsers] = useState([])
    const [filtro,setFiltro] = useState("")

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(data =>{
            const filtrados = data.filter((user)=> user.name.toLowerCase().includes(filtro.toLowerCase()))

            setUsers(filtrados)
        })
        console.log(users)
    },[filtro])

    return(
        <>
            {/* <p>{contador}</p>
            <button onClick={incrementaValor}>Incrementar</button> */}

        <input
        type="text"
        placeholder="Filtrar por nome..."
        className={styles.inputSearch}
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        />
        <div className={styles.cardContainerApi}>
            {
                users.map((user)=>(
                    <div className={styles.card} key={user.id}>
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                        <p>{user.address.street}</p>
                    </div>
                ))
            }
        </div>
        </>
    )
}

// export const CardApi = () => {
//     const [contador, setContador] = useState(0)
    
//     const incrementar = () => {
//     setContador(contador+1)
     
//     };
    
//     return (
//      <>  <p>Valor:{contador}</p>
//      <button onclick={incrementar}>Incrementar</button>
//     </>
//     );
//     };
// export default CardApi