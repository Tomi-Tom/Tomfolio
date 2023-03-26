import styles from '../styles/Projects.module.css';

interface Project {
    id: number;
    image: string;
    title: string;
    description: string;
    link: string;
}

const projectsList: Project[] = [
    {
        id: 1,
        image: "/ChatProject.png",
        title: "Project 1",
        description: "Description of Project 1",
        link: "https://github.com/project1"
    },
    {
        id: 2,
        image: "/ShopProject.png",
        title: "Project 2",
        description: "Description of Project 2",
        link: "https://github.com/project2"
    },
    {
        id: 3,
        image: "/ManageProject.png",
        title: "Project 3",
        description: "Description of Project 3",
        link: "https://github.com/project3"
    }
];

export default function Projects(): JSX.Element {
    return (
        <section id="projects" className={styles.projects}>
            <div className={styles.container}>
                <h2 className={styles.title}>Featured Projects</h2>
                <br/><br/><br/>
                <div className={styles.grid}>
                    {projectsList.map((project) => (
                        <div key={project.id} className={styles.card}>
                            <img src={project.image} alt={project.title} />
                            <div className={styles.content}>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <a href={project.link} target="_blank" rel="noopener noreferrer">View on GitHub</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
