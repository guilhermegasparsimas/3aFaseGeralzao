import styles from './Footer.module.css'

const Footer = ({copyright}) => {
    return (
        <>
            <footer className={styles.footer}>
                <h2 className={styles.title}>{copyright}</h2>
            </footer>
        </>
    )
}

export default Footer