let currentPage = 1;
const productsPerPage = 8;
const apiEndpoint = "https://desafio-api.bold.workers.dev/products";

async function loadProducts(page) {
  try {
    const response = await fetch(
      `${apiEndpoint}?page=${page}&limit=${productsPerPage}`
    );

    if (!response.ok) {
      throw new Error("Error loading products");
    }

    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error("Error:", error);
  }
}

function renderProducts(data) {
  const cards = document.querySelector("[ev-product-grid]");
  data.products.forEach((product) => {
    const item = document.createElement("div");
    item.classList.add("card");
    item.innerHTML = `
      <img class="card__img" src="https:${product.image}" alt="${product.name}" />
      <h3 class="card__title">${product.name}</h3>
      <p class="card__desc">${product.description}</p>
      <div class="card__values">
        <p class="card__old-price">De: R$ ${product.oldPrice}</p>
        <p class="card__price">Por: R$ ${product.price}</p>
        <p class="card__installments">Ou R$ ${product.installments.count} de R$${product.installments.value}</p>
      </div>
      <button class="btn" type="button">Comprar</button>
    `;
    cards.appendChild(item);
  });
}

document.querySelector("[ev-load-more]").addEventListener("click", () => {
  currentPage++;
  loadProducts(currentPage);
});

loadProducts(currentPage);
