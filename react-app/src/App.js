import "./App.css";
import Header from "./components/Header/Header";
import Employee from "./components/Employee/Employee";
import { useEffect, useState } from "react";
import { list } from "./data";
import Model from "./components/model/model";

const defaultFormState = {
  id: "",
  imageUrl: "",
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  age: "",
  dob: "",
  salary: "",
  address: "",
};

function App() {
  const [employeeList, setEmployeeList] = useState(list);
  const [selectedEmp, setSelectedEmp] = useState(list[0]);
  const [isOpen, setOpen] = useState(false);
  const [formData, setFormData] = useState(defaultFormState);
  const handleDelete = (e, id) => {
    e.stopPropagation();
    const copyList = [...employeeList];
    setEmployeeList(
      copyList.filter((item) => item.id.toString() !== id.toString())
    );
    setSelectedEmp(employeeList[0]);
  };

  const addEmployee = () => {
    setOpen(true);
  };
  const handleSubmit = (e, submitData) => {
    e.preventDefault();
    const updatedData = { ...submitData };
    updatedData["id"] = Math.random().toString();
    updatedData["imageUrl"] =
      updatedData["imageUrl"] ||
      "https://cdn-icons-png.flaticon.com/512/0/93.png";
    updatedData["age"] =
      new Date().getFullYear() - parseInt(updatedData["dob"].slice(0, 4), 10);
    console.log(updatedData);
    setEmployeeList([...employeeList, updatedData]);
    setFormData(defaultFormState);
    setOpen(false);
  };
  return (
    <div className="App">
      <Header addEmployee={addEmployee} />
      <Employee
        employeeList={employeeList}
        selectedEmp={selectedEmp}
        setSelectedEmp={setSelectedEmp}
        handleDelete={handleDelete}
      />
      <Model
        isOpen={isOpen}
        setOpen={setOpen}
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}

export default App;
