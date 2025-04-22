import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Education = () => {
  const education = [
    {
      id: 1,
      school: "Bates College",
      degree: "Bachelor of Science in Physics, Minor in Mathematics",
      period: "2019 - 2023",
      description:
        "Completed a comprehensive physics program with a focus on theoretical and experimental physics. Supplemented with advanced mathematics coursework for a well-rounded STEM foundation.",
    },
  ];

  return (
    <Card className="mb-5 border-0 shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold" id="education-heading">
          <i className="bi bi-mortarboard me-2" aria-hidden="true"></i>{" "}
          Education
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div role="list" aria-labelledby="education-heading">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="mb-4 pb-4 border-b last:border-0 education-item"
              role="listitem"
              tabIndex={0}
            >
              <div className="d-flex justify-content-between mb-2">
                <h3 className="font-bold text-lg" id={`degree-${edu.id}`}>
                  {edu.degree}
                </h3>
                <span
                  className="text-muted-foreground"
                  aria-label={`Period: ${edu.period}`}
                >
                  {edu.period}
                </span>
              </div>
              <h4 className="text-md text-primary mb-2" id={`school-${edu.id}`}>
                {edu.school}
              </h4>
              <p
                className="text-muted-foreground description"
                aria-labelledby={`degree-${edu.id} school-${edu.id}`}
                tabIndex={0}
              >
                {edu.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Education;
