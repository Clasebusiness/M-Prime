const PRODUCTS = [
  {
    id: 1,
    name: "Audífonos Bluetooth",
    price: 29990,
    delivery: "24–48 hrs",
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1518441902117-f0a00f9daceb?w=800",
  },
  {
    id: 2,
    name: "Smartwatch Fitness",
    price: 34990,
    delivery: "48–72 hrs",
    rating: 4.5,
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
  },
  {
    id: 3,
    name: "Mochila Urbana",
    price: 24990,
    delivery: "24–72 hrs",
    rating: 4.6,
    img: "https://images.unsplash.com/photo-1526481280695-3c687fd5432c?w=800",
  },
  {
    id: 4,
    name: "Cafetera Italiana",
    price: 15990,
    delivery: "48–96 hrs",
    rating: 4.4,
    img: "https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=800",
  },
  {
    id: 5,
    name: "Lámpara LED Escritorio",
    price: 12990,
    delivery: "24–72 hrs",
    rating: 4.3,
    img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800",
  },
  {
    id: 6,
    name: "Cargador USB-C 30W",
    price: 11990,
    delivery: "24–48 hrs",
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800",
  },
  {
    id: 7,
    name: "Botella Térmica",
    price: 13990,
    delivery: "48–72 hrs",
    rating: 4.6,
    img: "https://images.unsplash.com/photo-1526401485004-2aa6d8b9342d?w=800",
  },
  {
    id: 8,
    name: "Mouse Inalámbrico",
    price: 9990,
    delivery: "24–72 hrs",
    rating: 4.4,
    img: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800",
  },
  {
    id: 9,
    name: "Bandas Elásticas",
    price: 10990,
    delivery: "48–72 hrs",
    rating: 4.5,
    img: "https://images.unsplash.com/photo-1599058917765-4f7d0f52b0f9?w=800",
  },
  {
    id: 10,
    name: "Gafas Polarizadas",
    price: 18990,
    delivery: "48–96 hrs",
    rating: 4.3,
    img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
  }
];

let cart = [];

const grid = document.getElementById("productsGrid");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cartModal");
const cartBody = document.getElementById("cartBody");

function formatCLP(value) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}

function renderProducts(list = PRODUCTS) {
  grid.innerHTML = list.map(p => `
    <article class="product">
      <img src="${p.img}" alt="${p.name}">
      <div class="productContent">
        <h3>${p.name}</h3>
        <div class="price">${formatCLP(p.price)}</div>
        <div class="meta">🚚 ${p.delivery}</div>
        <div class="rating">⭐ ${p.rating}</div>
        <button onclick="addToCart(${p.id})">Agregar al carrito</button>
      </div>
    </article>
  `).join("");
}

function addToCart(id) {
  cart.push(id);
  cartCount.textContent = cart.length;
}

function openCart() {
  cartBody.innerHTML = cart.length
    ? `<p>Productos en carrito: ${cart.length}</p>`
    : `<p>Carrito vacío</p>`;
  cartModal.showModal();
}

function closeCart() {
  cartModal.close();
}

document.getElementById("searchInput").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q)
  );
  renderProducts(filtered);
});

renderProducts();
