import styles from '../styles/Footer.module.css';
export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                    <div>
                        <a href="https://github.com/username" target="_blank" rel="noopener noreferrer">
                            <p>Github</p>
                        </a>
                    </div>
                    <div>
                        <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer">
                            <p>Linkedin</p>
                        </a>
                    </div>
                    <div>
                        <a href="https://twitter.com/username" target="_blank" rel="noopener noreferrer">
                            <p>Twitter</p>
                        </a>
                    </div>
                <p className={styles.copy}>
                    &copy; 2023 Tom BP. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
