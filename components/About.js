import styles from '../styles/About.module.css';

export default function About() {
    return (
        <section id={"about"} className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.heading}>About Me</h2>
                <br/><br/>
                <p className={styles.paragraph}>
                    Hello Everyone,
                </p>
                <br/>
                <p className={styles.paragraph}>
                    My name is Tom and I am a 22-year-old web developer who is highly motivated, dedicated, and passionate about my work. I have developed my skills in various programming languages, including C, Python, C++, Haskell, Javascript, Typescript, React, Next, Go, Html, and Css.
                </p>
                <p className={styles.paragraph}>
                    With my experience and expertise, I am confident that I can help businesses and individuals create outstanding web-based solutions. Whether it is developing a complex web application, designing a responsive website, or optimizing user experience, I can handle it all with ease.
                </p>
                <br/>
                <p className={styles.paragraph}>
                    As a developer, I understand the importance of staying up-to-date with the latest trends and technologies in the industry. That is why I am always looking for new challenges and opportunities to learn and grow as a professional.
                </p>
                <br/>
                <p className={styles.paragraph}>
                    If you are looking for a skilled and dedicated web developer who is committed to delivering exceptional results, look no further. I am excited to hear about your project and discuss how I can help you achieve your goals.
                </p>
                <p className={styles.paragraph}>
                    Thank you for considering me.
                </p>
            </div>
        </section>
    );
}
