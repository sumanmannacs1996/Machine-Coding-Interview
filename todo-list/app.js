(function () {
  const INPUT_FORM = document.querySelector(".input-form");
  const FORM_INPUT = document.querySelector(".form-input");
  const INPUT_BUTTON = document.querySelector(".input-button");
  const TODO_LIST_CONTAINER = document.querySelector(".todo-list");
  let TODO_DATA = [];
  let isEditing = false;
  let nameOfEditItem = "";

  const prepareSingleTodo = (name) => {
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    const textSpan = document.createElement("span");
    textSpan.innerText = name;
    editBtn.innerText = `✏️`;
    deleteBtn.innerText = `❌`;
    editBtn.setAttribute("name", name);
    editBtn.setAttribute("type", "edit");
    deleteBtn.setAttribute("name", name);
    deleteBtn.setAttribute("type", "delete");
    editBtn.classList.add("todo-single-btn");
    deleteBtn.classList.add("todo-single-btn");
    textSpan.classList.add("todo-text");
    const wrapper = document.createElement("div");
    wrapper.classList.add("single-todo-container");
    wrapper.appendChild(editBtn);
    wrapper.appendChild(textSpan);
    wrapper.appendChild(deleteBtn);
    return wrapper;
  };

  const renderList = (list) => {
    TODO_LIST_CONTAINER.innerHTML = "";
    list.forEach((name) => {
      const singleTodo = prepareSingleTodo(name);
      TODO_LIST_CONTAINER.appendChild(singleTodo);
    });
  };

  INPUT_FORM.addEventListener("submit", (e) => {
    e.preventDefault();
    const inpuText = FORM_INPUT.value.trim();
    if (isEditing) {
      const index = TODO_DATA.findIndex((name) => name === nameOfEditItem);
      if (index !== -1) {
        TODO_DATA[index] = inpuText;
      }
      isEditing = false;
      nameOfEditItem = "";
    } else {
      TODO_DATA.push(inpuText);
    }
    FORM_INPUT.value = "";
    renderList(TODO_DATA);
  });

  TODO_LIST_CONTAINER.addEventListener("click", (e) => {
    const target = e.target;
    console.dir(target);
    if (target.tagName === "BUTTON") {
      const todoName = target.getAttribute("name");
      const targetType = target.getAttribute("type");
      console.log(todoName, targetType);
      if (targetType === "edit") {
        FORM_INPUT.value = todoName;
        FORM_INPUT.focus();
        isEditing = true;
        nameOfEditItem = todoName;
      } else if (targetType === "delete") {
        TODO_DATA = TODO_DATA.filter((name) => name !== todoName);
        renderList(TODO_DATA);
      }
    }
  });
})();
