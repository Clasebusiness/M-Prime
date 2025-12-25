const products = [
  { id:1, name:"Polera M-Prime", price:14990, cat:"fashion", img:"https://images.unsplash.com/photo-1520975958225-2c9f0b48b4f1?w=800" },
  { id:2, name:"Gorro M-Prime", price:9990, cat:"accessories", img:"https://images.unsplash.com/photo-1528701800489-20be9c2f1e2b?w=800" },
  { id:3, name:"Audífonos Bluetooth", price:29990, cat:"tech", img:"https://images.unsplash.com/photo-1518441902117-f0a00f9daceb?w=800" },
  { id:4, name:"Botella Kids", price:12990, cat:"kids", img:"https://images.unsplash.com/photo-1526401485004-2aa6d8b9342d?w=800" }
];

let cart = [];

const grid = document.getElementById("productsGrid");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const whatsappBtn = document.getElementById("whatsappBtn");

function renderProducts(list) {
  grid.innerHTML = list.map(p => `
    <div class="product">
      <img src="${p.img}">
      <h3>${p.name}</h3>
      <strong>$${p.price.toLocaleString("es-CL")}</strong>
      <button onclick="addToCart(${p.id})">Agregar</button>
    </div>
  `).join("");
}

function filterCategory(cat) {
  if (cat === "all") renderProducts(products);
  else renderProducts(products.filter(p => p.cat === cat));
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  cartCount.textContent = cart.length;
}

function toggleCart() {
  cartModal.style.display = cartModal.style.display === "flex" ? "none" : "flex";
  renderCart();
}

function renderCart() {
  let total = 0;
  cartItems.innerHTML = cart.map(p => {
    total += p.price;
    return `<p>${p.name} - $${p.price.toLocaleString("es-CL")}</p>`;
  }).join("");

  cartTotal.textContent = `$${total.toLocaleString("es-CL")}`;
  whatsappBtn.href = `https://wa.me/569XXXXXXXX?text=Hola, quiero comprar en M-Prime`;
}

function goHome() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function scrollToProducts() {
  document.getElementById("productos").scrollIntoView({ behavior: "smooth" });
}

renderProducts(products);
