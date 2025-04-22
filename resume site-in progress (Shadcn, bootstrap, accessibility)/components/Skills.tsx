import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Skills = () => {
  const skillCategories = [
    {
      id: 1,
      category: "Physics",
      skills: [
        "Theoretical Physics",
        "Experimental Methods",
        "Data Analysis",
        "Statistical Mechanics",
        "Quantum Mechanics",
        "Astrophysics",
        "Electromagnetism",
      ],
    },
    {
      id: 2,
      category: "Mathematics",
      skills: [
        "Calculus",
        "Linear Algebra",
        "Differential Equations",
        "Statistics",
        "Mathematical Modeling",
        "Numerical Analysis",
      ],
    },
    {
      id: 3,
      category: "Healthcare",
      skills: [
        "Phlebotomy",
        "Patient Care",
        "Medical Terminology",
        "Healthcare Protocols",
        "Sample Collection",
        "Clinical Documentation",
      ],
    },
    {
      id: 4,
      category: "Education & Communication",
      skills: [
        "Tutoring",
        "Curriculum Planning",
        "Academic Support",
        "Clear Communication",
        "Problem Solving",
        "Concept Explanation",
      ],
    },
    {
      id: 5,
      category: "Technical",
      skills: [
        "MATLAB",
        "Python",
        "LaTeX",
        "Data Visualization",
        "Laboratory Equipment",
        "Technical Writing",
      ],
    },
  ];

  return (
    <Card className="mb-5 border-0 shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold">
          <i className="bi bi-tools me-2" aria-hidden="true"></i> Skills
        </CardTitle>
      </CardHeader>
      <CardContent>
        {skillCategories.map((category) => (
          <div key={category.id} className="mb-4">
            <h3
              className="font-bold text-md mb-2"
              id={`skill-category-${category.id}`}
            >
              {category.category}
            </h3>
            <div
              className="d-flex flex-wrap gap-2"
              role="group"
              aria-labelledby={`skill-category-${category.id}`}
            >
              {category.skills.map((skill) => (
                <Button
                  key={skill}
                  variant="outline"
                  className="rounded-full text-sm py-1 px-3 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  tabIndex={0}
                  role="button"
                >
                  {skill}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Skills;
