import React from "react";
import "./style.css";

function Employee({ employeeList, selectedEmp, setSelectedEmp, handleDelete }) {
  return (
    <div className="employee-container">
      <div className="employee-list-container">
        <div className="employee-list-title">List of Employees</div>
        <div className="employee-list-elements">
          {employeeList.map((emp) => (
            <span
              key={emp.id}
              className={
                selectedEmp.id.toString() === emp.id.toString() ? "active" : ""
              }
              onClick={() => setSelectedEmp(emp)}
            >
              {emp.firstName} {emp.lastName}{" "}
              <i
                onClick={(e) => handleDelete(e, emp.id)}
                className="employeeDelete"
              >
                ❌
              </i>
            </span>
          ))}
        </div>
      </div>

      <div className="employee-info-container">
        <div className="employee-info-title">Employee Information</div>
        <div className="employee-info-elements">
          <img
            src={selectedEmp.imageUrl}
            alt="profile picture of the employee"
          />
          <span className="emp-info-name">
            {selectedEmp.firstName} {selectedEmp.lastName} ({selectedEmp.age})
          </span>
          <span>{selectedEmp.address}</span>
          <span>{selectedEmp.email}</span>
          <span>Mobile - {selectedEmp.contactNumber}</span>
          <span>DOB - {selectedEmp.dob}</span>
        </div>
      </div>
    </div>
  );
}

export default Employee;
