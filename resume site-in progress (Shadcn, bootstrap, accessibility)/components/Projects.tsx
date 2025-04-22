import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const projects = [
    {
      id: 1,
      name: "Physics Research Project",
      description:
        "Conducted an independent research project studying the quantum mechanical properties of condensed matter systems. Utilized computational modeling to simulate particle interactions and analyzed results to draw conclusions about fundamental physical properties.",
      technologies: [
        "Quantum Mechanics",
        "MATLAB",
        "Data Analysis",
        "Scientific Writing",
      ],
    },
    {
      id: 2,
      name: "Mathematical Modeling Study",
      description:
        "Developed mathematical models to predict and analyze complex systems in nature. Applied differential equations and statistical methods to create accurate representations of natural phenomena and test hypotheses.",
      technologies: [
        "Differential Equations",
        "Python",
        "Statistical Analysis",
        "Modeling",
      ],
    },
    {
      id: 3,
      name: "Physics Lab Demonstrations",
      description:
        "Created and conducted physics demonstrations for introductory physics courses. Designed experiments that clearly illustrated fundamental physics concepts in mechanics, electricity, and optics for educational purposes.",
      technologies: [
        "Experimental Design",
        "Physics Principles",
        "Teaching Materials",
        "Lab Equipment",
      ],
    },
  ];

  return (
    <Card className="mb-5 border-0 shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold" id="projects-heading">
          <i className="bi bi-kanban me-2" aria-hidden="true"></i> Academic
          Projects
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div role="list" aria-labelledby="projects-heading">
          {projects.map((project) => (
            <div
              key={project.id}
              className="mb-4 pb-4 border-b last:border-0 project-item"
              role="listitem"
              tabIndex={0}
            >
              <h3
                className="font-bold text-lg mb-2"
                id={`project-${project.id}`}
              >
                {project.name}
              </h3>
              <p
                className="text-muted-foreground mb-3 description"
                aria-labelledby={`project-${project.id}`}
                tabIndex={0}
              >
                {project.description}
              </p>
              <div
                className="d-flex flex-wrap gap-2"
                role="group"
                aria-label={`Skills used in ${project.name}`}
              >
                {project.technologies.map((tech) => (
                  <Button
                    key={tech}
                    variant="outline"
                    size="sm"
                    className="rounded-full py-0 px-3 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    tabIndex={0}
                    role="button"
                  >
                    {tech}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Projects;
