import styles from '../styles/HeroBanner.module.css';

export default function HeroBanner() {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <h1 className={styles.title}>Tom BP</h1>
                <p className={styles.subtitle}>Fullstack Developer</p>
                <a href="#projects" className={styles.cta}>View Recent Projects</a>
            </div>
        </section>
    );
}
