import { products } from "./products.js";

const sectionCenter = document.querySelector(".section-center");
const buttonContainer = document.querySelector(".btn-container");

// Loop through the products, and create an HTML blueprint, add into the HTML dynamically.
const displayProducts = (products) => {
  // Blueprint the HTML structure for all product items
  const allProducts = products.map((product) => {
    return `
    <div class="product-item">
    <img src="${product.thumbnail}" alt="${product.title}" class="photo">
    <div class="item-info">
    <header>
    <h4>${product.title}</h4>
    </header>
    <p class="item-text">
    ${product.description}
    </p>
    <footer class="price">
    <h4>$${product.price}</h4>
    </footer>
    </div>
    </div>
    `;
  });

  // Replace the inner HTML of .secion-center with category buttons
  sectionCenter.innerHTML = allProducts.join("");
};

const displayCategoryButtons = () => {
  // Extract all categories in an array
  const categories = products.reduce(
    (acc, item) => {
      if (!acc.includes(item.category)) {
        acc.push(item.category);
      }
      return acc;
    },
    ["all"]
  );

  // Blueprint the button structure for all category items
  const allCategories = categories.map((category) => {
    return `<button type="button" class="filter-btn">${category}</button>`;
  });

  // Replace the inner HTML of .btn-container with category buttons
  buttonContainer.innerHTML = allCategories.join("");

  // Add event listener to all category buttons
  const filterButtons = buttonContainer.querySelectorAll(".filter-btn");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (e.target.innerHTML === "all") {
        displayProducts(products);
      } else {
        const filteredProducts = products.filter(
          (product) => e.target.innerHTML === product.category
        );
        displayProducts(filteredProducts);
      }
    });
  });
};

// Invoke Functions
window.addEventListener("DOMContentLoaded", () => {
  displayProducts(products);
  displayCategoryButtons();
});
