import React from "react";
import "./style.css";

function Header({ addEmployee }) {
  return (
    <div className="header">
      <h1>Employee Database managemnet System</h1>
      <button onClick={addEmployee}>Add Employee</button>
    </div>
  );
}

export default Header;
