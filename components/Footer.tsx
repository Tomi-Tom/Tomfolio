import styles from '../styles/Footer.module.css';

export default function Footer(): JSX.Element {
    return (
        <footer id="footer" className={styles.footer}>
            <div className={styles.container}>
                <div>
                    <a href="https://github.com/Tomi-Tom" target="_blank" rel="noopener noreferrer" className={styles.link}>
                        <img src={"/Github.png"} alt="GitHub" />
                    </a>
                </div>
                <div>
                    <a href="https://www.linkedin.com/in/tom-bp/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                        <img src={"/Linkedin.png"} alt="LinkedIn" />
                    </a>
                </div>
            </div>
            <p className={styles.copy}>
                <br/>
                &copy; 2023 Tom BP. All rights reserved.
            </p>
            <div className={styles.container}>
                <div>
                    <a href="https://www.linkedin.com/in/tom-bp/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                        <img src={"/Linkedin.png"} alt="LinkedIn" />
                    </a>
                </div>
                <div>
                    <a href="https://github.com/Tomi-Tom" target="_blank" rel="noopener noreferrer" className={styles.link}>
                        <img src={"/Github.png"} alt="GitHub" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
