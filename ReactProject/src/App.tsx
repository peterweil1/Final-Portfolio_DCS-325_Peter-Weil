import React from "react";
import BasicButton from "./components/BasicButton";
import ListGroup from "./components/ListGroup";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="container">
      <BasicButton />
      <ListGroup />
    </div>
  );
};
export default App;
