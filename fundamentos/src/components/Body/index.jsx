import Card from "./Card"
import styles from "./Body.module.css"
import { CardApi } from "./Card/CardApi"


function Body(){
    const usuarios = [
        {nome:"Ana", idade:22, cidade:"Biguaçu"},
        {nome:"Beatriz", idade:43, cidade:"Palhoça"},
        {nome:"Priscila", idade:54, cidade:"Rio de Janeiro"},
    ]
    return(

        <main className={styles.body}>
            <h2>Usuarios Cadastrados:</h2>
            <div className={styles.cardContainer}>
                {usuarios.map((usuario, index)=>(
                    <Card 
                     key={index}
                     nome={usuario.nome}
                     idade={usuario.idade}  
                     cidade={usuario.cidade}  
                    />
                ))}
                {/* <Card /> */}
            </div>
            
            <h2>Usuários vindo da API</h2>
            
            <div className={styles.cardContainer}>
                <CardApi />
            
            </div>

        </main>
    )
}

export default Body