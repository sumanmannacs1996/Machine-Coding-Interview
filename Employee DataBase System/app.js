(async function () {
  const data = await fetch("./data.json");
  let response = await data.json();
  let SelectedEmpId = response[0].id;
  let SelectedEmpDetails = response[0];
  console.log(response);
  const EmployeeList = document.querySelector(".employee-list");
  const EmployeeInfo = document.querySelector(".employee-info");
  const Model = document.querySelector(".emp-model");
  const addEmployeeForm = document.querySelector(".add-new-employee");

  EmployeeList.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN") {
      SelectedEmpId = e.target.id.toString();
      SelectedEmpDetails = response.find(
        (emp) => emp.id.toString() === SelectedEmpId
      );
      console.log(SelectedEmpDetails);
      renderEmpList(response);
      renderEmpInfo(SelectedEmpDetails);
    }
    if (e.target.tagName === "I") {
      response = response.filter(
        (emp) => emp.id.toString() !== e.target.parentNode.id
      );
      renderEmpList(response);
      SelectedEmpId = response[0].id;
      SelectedEmpDetails = response[0];
      renderEmpInfo(SelectedEmpDetails);
    }
  });

  function renderEmpList(empList) {
    EmployeeList.innerHTML = "";
    empList.forEach((emp) => {
      const employee = document.createElement("span");
      employee.setAttribute("id", emp.id);
      employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete">❌</i>`;
      if (emp.id.toString() === SelectedEmpId) {
        employee.classList.add("selected");
      }
      EmployeeList.appendChild(employee);
    });
  }

  renderEmpList(response);
  renderEmpInfo(SelectedEmpDetails);
  function renderEmpInfo(emp) {
    EmployeeInfo.innerHTML = `
    <img src ="${emp.imageUrl}" alt="profile-picture"/>
    <span class="employee-single-heading">${emp.firstName} ${emp.lastName} (${emp.age})</span>
    <span>${emp.address}</span>
    <span>${emp.email}</span>
    <span>Mobile - ${emp.contactNumber}</span>
    <span>DOB - ${emp.dob}</span>
    `;
  }

  const ADD_BUTTON = document.querySelector(".add-employee");
  ADD_BUTTON.addEventListener("click", () => {
    Model.style.display = "flex";
  });

  Model.addEventListener("click", (e) => {
    if (e.target.className === "emp-model") {
      Model.style.display = "none";
    }
  });

  addEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const myForm = e.target;
    const formData = new FormData(myForm);
    const inptValues = Object.fromEntries(formData);
    inptValues["id"] = Math.random().toString();
    inptValues["imageUrl"] =
      inptValues["imageUrl"] ||
      "https://cdn-icons-png.flaticon.com/512/0/93.png";
    inptValues["age"] =
      new Date().getFullYear() - parseInt(inptValues["dob"].slice(0, 4), 10);
    console.log(inptValues);
    response.push(inptValues);
    renderEmpList(response);
    myForm.reset();
    Model.style.display = "none";
  });
})();
