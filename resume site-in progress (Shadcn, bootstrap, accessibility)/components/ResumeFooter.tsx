import React from "react";

const ResumeFooter = () => {
  return (
    <footer
      className="container text-center py-4 mt-5 text-muted-foreground border-t"
      role="contentinfo"
      aria-label="Page footer"
    >
      <p tabIndex={0}>
        © {new Date().getFullYear()} Peter Weil. All rights reserved.
      </p>
      <p className="text-sm mt-1" tabIndex={0}>
        Built with Next.js, Tailwind CSS, ShadCN UI, and Bootstrap
      </p>
    </footer>
  );
};

export default ResumeFooter;
