(function () {
  const PRDUCT_CONTAINER = document.querySelector(".product-contaner");
  const PAGINATION_CONTAINER = document.querySelector(".pagination-contaner");
  const ITEMS_PER_PAGE_SELECT = document.querySelector("#select-item");
  let productList = [];
  let currentPage = 1;
  let maxPageLimit;
  let productPerPage = 12;

  const fetchProductList = async (url) => {
    return fetch(url)
      .then((jsnResponse) => {
        return jsnResponse.json();
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  };

  const createSingleProduct = (product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.setAttribute("id", product.id);
    productCard.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}"/>
        <p>${product.title}</p>
    `;
    return productCard;
  };

  function renderProducts(productList = []) {
    PRDUCT_CONTAINER.innerHTML = "";
    let paginatedList = productList.slice(
      productPerPage * currentPage - productPerPage,
      productPerPage * currentPage
    );
    console.log("*********paginatedList", paginatedList);
    paginatedList.forEach((product) => {
      PRDUCT_CONTAINER.appendChild(createSingleProduct(product));
    });
  }

  const createPaginatedBtn = (name) => {
    const btn = document.createElement("button");
    btn.setAttribute("id", name);
    btn.classList.add("padinated-btn");
    if (Number(currentPage) == Number(name)) {
      btn.classList.add("active");
    }
    btn.innerText = name;
    return btn;
  };

  const renderPaginationButtons = (productList) => {
    const numberOfButtons = Math.ceil(productList.length / productPerPage);
    maxPageLimit = numberOfButtons;
    PAGINATION_CONTAINER.innerHTML = "";
    PAGINATION_CONTAINER.appendChild(createPaginatedBtn("◀️"));
    for (let i = 1; i <= numberOfButtons; i++) {
      PAGINATION_CONTAINER.appendChild(createPaginatedBtn(i));
    }
    PAGINATION_CONTAINER.appendChild(createPaginatedBtn("▶️"));
  };

  (async function () {
    const loderComponent = document.createElement("span");
    loderComponent.innerText = "Loading....";
    PRDUCT_CONTAINER.appendChild(loderComponent);
    PAGINATION_CONTAINER.appendChild(loderComponent);
    const apiResponse = await fetchProductList(
      "https://dummyjson.com/products?limit=190"
    );
    productList = apiResponse.products;
    renderProducts(productList);
    renderPaginationButtons(productList);
  })();

  PAGINATION_CONTAINER.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "BUTTON") {
      const name = target.getAttribute("id");
      if (!isNaN(name)) {
        currentPage = Number(name);
      } else if (name === "◀️") {
        if (currentPage > 1) {
          currentPage = currentPage - 1;
        }
      } else if (name === "▶️") {
        if (currentPage < maxPageLimit) currentPage = currentPage + 1;
      }
      const buttonList = document.querySelectorAll(".padinated-btn");
      buttonList.forEach((btnEl, idx) => {
        if (idx === currentPage) {
          btnEl.classList.add("active");
        } else {
          btnEl.classList.remove("active");
        }
      });
      renderProducts(productList);
    }
  });

  ITEMS_PER_PAGE_SELECT.addEventListener("change", function () {
    productPerPage = Number(this.value);
    currentPage = 1;
    renderProducts(productList);
    renderPaginationButtons(productList);
  });
})();
