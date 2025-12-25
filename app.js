const products = [
  {
    name: "Audífonos Bluetooth",
    price: 29990,
    rating: 4.7,
    category: "tech",
    img: "https://images.unsplash.com/photo-1585386959984-a41552231693?auto=format&fit=contain&w=600"
  },
  {
    name: "Smartwatch Fitness",
    price: 34990,
    rating: 4.5,
    category: "tech",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=contain&w=600"
  },
  {
    name: "Mochila Urbana",
    price: 24990,
    rating: 4.4,
    category: "acc",
    img: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=contain&w=600"
  },
  {
    name: "Polera M-Prime",
    price: 14990,
    rating: 4.6,
    category: "ropa",
    img: "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=contain&w=600"
  }
];

const grid = document.getElementById("productsGrid");
const cartPanel = document.getElementById("cartPanel");
const cartCount = document.getElementById("cart-count");

let cart = [];

function formatCLP(n) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
  }).format(n);
}

function renderProducts(filter = "all") {
  grid.innerHTML = products
    .filter(p => filter === "all" || p.category === filter)
    .map(p => `
      <article class="product">
        <div class="product-img">
          <img src="${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/400x300?text=M-Prime'">
        </div>
        <h3>${p.name}</h3>
        <div class="price">${formatCLP(p.price)}</div>
        <div class="rating">⭐ ${p.rating}</div>
        <button onclick="addToCart('${p.name}', ${p.price})">Agregar</button>
      </article>
    `).join("");
}

function addToCart(name, price) {
  cart.push({ name, price });
  cartCount.textContent = cart.length;
}

document.querySelectorAll(".menu button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".menu .active")?.classList.remove("active");
    btn.classList.add("active");
    renderProducts(btn.dataset.category);
  });
});

document.getElementById("openCart").onclick = () => {
  cartPanel.classList.add("open");
};

document.querySelector(".close-cart").onclick = () => {
  cartPanel.classList.remove("open");
};

renderProducts();
