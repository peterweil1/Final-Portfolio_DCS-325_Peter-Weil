import React from "react";

// Define the component as a React Functional Component (React.FC)
const BasicButton: React.FC = () => {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return <button onClick={handleClick}>Click Me</button>;
};

export default BasicButton;
