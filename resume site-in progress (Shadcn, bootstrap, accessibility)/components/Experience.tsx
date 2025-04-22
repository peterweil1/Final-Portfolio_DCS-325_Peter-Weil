import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Experience = () => {
  const experiences = [
    {
      id: 1,
      company: "Bassett Hospital",
      position: "Inpatient Phlebotomist",
      period: "2022 - 2023",
      description:
        "Worked as an inpatient phlebotomist, drawing blood samples from patients for diagnostic testing. Developed strong interpersonal skills while providing compassionate care. Maintained detailed records and ensured adherence to healthcare protocols and safety standards.",
    },
    {
      id: 2,
      company: "Bates College",
      position: "STEM Tutor",
      period: "2020 - 2023",
      description:
        "Provided academic tutoring for multiple disciplines including mathematics, Digital & Computational Studies (DCS), and physics courses. Helped students understand complex concepts and improve their academic performance. Developed effective teaching and communication skills.",
    },
  ];

  return (
    <Card className="mb-5 border-0 shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold" id="work-experience-heading">
          <i className="bi bi-briefcase me-2" aria-hidden="true"></i> Work
          Experience
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div role="list" aria-labelledby="work-experience-heading">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="mb-4 pb-4 border-b last:border-0 experience-item"
              role="listitem"
              tabIndex={0}
            >
              <div className="d-flex justify-content-between mb-2">
                <h3 className="font-bold text-lg" id={`job-title-${exp.id}`}>
                  {exp.position}
                </h3>
                <span
                  className="text-muted-foreground"
                  aria-label={`Period: ${exp.period}`}
                >
                  {exp.period}
                </span>
              </div>
              <h4
                className="text-md text-primary mb-2"
                id={`company-${exp.id}`}
              >
                {exp.company}
              </h4>
              <p
                className="text-muted-foreground description"
                aria-labelledby={`job-title-${exp.id} company-${exp.id}`}
                tabIndex={0}
              >
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Experience;
