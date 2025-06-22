const TAB_CONFIG = [
  { id: "tab1", name: "Tab 1", content: "This is Tab 1 Content" },
  { id: "tab2", name: "Tab 2", content: "This is Tab 2 Content" },
  { id: "tab3", name: "Tab 3", content: "This is Tab 3 Content" },
  { id: "tab4", name: "Tab 4", content: "This is Tab 4 Content" },
  { id: "tab5", name: "Tab 5", content: "This is Tab 5 Content" },
];

(function () {
  const TAB_HEADING = document.querySelector(".tab-heading");
  const TAB_CONTENT = document.querySelector(".tab-content");
  let currentActiveIndex = 0;

  const renderTabHeading = (tabs) => {
    TAB_HEADING.innerHTML = "";
    tabs.forEach((tab, idx) => {
      const tabBtn = document.createElement("button");
      tabBtn.innerText = tab.name;
      tabBtn.setAttribute("id", tab.id);
      TAB_HEADING.appendChild(tabBtn);
      tabBtn.classList.add("tab-btn");
      if (idx === currentActiveIndex) {
        tabBtn.classList.add("active");
      }
    });
  };

  const renderTabContent = (tab) => {
    const contnetDiv = document.createElement("div");
    contnetDiv.innerHTML = `<h3>${tab.name}</h3><p>${tab.content}</p>`;
    TAB_CONTENT.innerHTML = "";
    TAB_CONTENT.appendChild(contnetDiv);
  };

  renderTabHeading(TAB_CONFIG);
  renderTabContent(TAB_CONFIG[currentActiveIndex]);

  TAB_HEADING.addEventListener("click", (e) => {
    const clickedTabId = e.target.getAttribute("id");
    currentActiveIndex = TAB_CONFIG.findIndex((tab) => tab.id === clickedTabId);
    renderTabHeading(TAB_CONFIG);
    renderTabContent(TAB_CONFIG[currentActiveIndex]);
  });
})();
