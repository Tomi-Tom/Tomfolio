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
        image: "/AREA.png",
        title: "AREA",
        description: "An innovative project that establishes a direct link between action and reaction through various services.",
        link: "https://area.rezar.fr/"
    },
    {
        id: 2,
        image: "/Rustracer.png",
        title: "Rustracer",
        description: "A Rust-based Raytracer project delivering advanced rendering capabilities.",
        link: "https://github.com/Tomi-Tom/Rustracer"
    },
    {
        id: 3,
        image: "/WIP.png",
        title: "Project 3",
        description: "Description of Project 3",
        link: "https://github.com/project3"
    },
    {
        id: 4,
        image: "/WIP.png",
        title: "Project 4",
        description: "Description of Project 4",
        link: "https://github.com/project4"
    },
    {
        id: 5,
        image: "/WIP.png",
        title: "Project 5",
        description: "Description of Project 5",
        link: "https://github.com/project5"
    },
    {
        id: 6,
        image: "/WIP.png",
        title: "Project 6",
        description: "Description of Project 6",
        link: "https://github.com/project4"
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
