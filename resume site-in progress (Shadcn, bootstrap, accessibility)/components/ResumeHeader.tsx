import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const ResumeHeader = () => {
  return (
    <Card className="mb-5 border-0 shadow">
      <CardContent className="p-5">
        <div className="row align-items-center">
          <div className="col-md-2 text-center mb-4 mb-md-0">
            <Avatar className="w-32 h-32 mx-auto bg-primary text-primary-foreground">
              <AvatarFallback
                className="text-3xl"
                aria-label="Peter Weil's profile picture"
              >
                PW
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="col-md-8">
            <h1
              className="text-3xl font-bold text-primary mb-2"
              id="resume-name"
            >
              Peter Weil
            </h1>
            <h2
              className="text-xl text-muted-foreground mb-3"
              id="resume-title"
            >
              Physics Major, Mathematics Minor
            </h2>
            <p className="text-muted-foreground mb-3">
              Bates College graduate with a strong background in physics and
              mathematics. Experienced in healthcare as a phlebotomist and
              academic tutoring for STEM subjects. Passionate about applying
              analytical skills to solve complex problems.
            </p>
          </div>
          <div className="col-md-2">
            <nav aria-label="Contact information">
              <div className="d-flex flex-column gap-2">
                <a
                  href="mailto:example@email.com"
                  className="text-primary hover:underline flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md p-1"
                  aria-label="Email Peter Weil"
                >
                  <i className="bi bi-envelope me-2" aria-hidden="true"></i>{" "}
                  Email
                </a>
                <a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md p-1"
                  aria-label="View Peter Weil's LinkedIn profile"
                >
                  <i className="bi bi-linkedin me-2" aria-hidden="true"></i>{" "}
                  LinkedIn
                </a>
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md p-1"
                  aria-label="View Peter Weil's GitHub profile"
                >
                  <i className="bi bi-github me-2" aria-hidden="true"></i>{" "}
                  GitHub
                </a>
              </div>
            </nav>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeHeader;
