import React from "react";
import "../styles/Projects.css";
import { projects } from "../game/data/projectsData"; // Import the project details

const Projects = ({ onClose, onProjectClick }) => {
  const handleProjectClick = (id) => {
    const project = projects.find((project) => project.id === id);
    if (project) {
      onProjectClick(project);
    }
  };

  return (
    <div className="projects-container">
      {/* Header */}
      <div className="projects-header">
        Projects
        <button onClick={onClose} className="close-button">✖</button>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-frame"
            onClick={() => handleProjectClick(project.id)}
          >
            <img src={project.image} alt={project.title} className="project-image" />
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
