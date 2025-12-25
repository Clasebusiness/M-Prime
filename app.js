document.addEventListener("DOMContentLoaded", () => {

  const products = [
    { id:1, name:"Audífonos Bluetooth", price:29990, img:"https://images.unsplash.com/photo-1518441902117-f0a00f9daceb?w=800" },
    { id:2, name:"Smartwatch Fitness", price:34990, img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800" },
    { id:3, name:"Mochila Urbana", price:24990, img:"https://images.unsplash.com/photo-1526481280695-3c687fd5432c?w=800" },
    { id:4, name:"Cafetera Italiana", price:15990, img:"https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=800" },
    { id:5, name:"Lámpara LED Escritorio", price:12990, img:"https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800" },
    { id:6, name:"Bolso Urbano", price:11990, img:"https://images.unsplash.com/photo-1585386959984-a41552231693?w=800" },
    { id:7, name:"Botella Térmica", price:13990, img:"https://images.unsplash.com/photo-1526401485004-2aa6d8b9342d?w=800" },
    { id:8, name:"Mouse Inalámbrico", price:9990, img:"https://images.unsplash.com/photo-1527814050087-3793815479db?w=800" }
  ];

  const cart = [];
  const grid = document.getElementById("productsGrid");

  const clp = n => new Intl.NumberFormat("es-CL",{style:"currency",currency:"CLP"}).format(n);

  grid.innerHTML = products.map(p => `
    <article class="product">
      <div class="product-img">
        <img src="${p.img}" alt="${p.name}">
      </div>
      <h3>${p.name}</h3>
      <div class="price">${clp(p.price)}</div>
      <div class="rating">⭐ 4.7</div>
      <button onclick="addToCart(${p.id})">Agregar al carrito</button>
    </article>
  `).join("");

  window.addToCart = id => {
    const product = products.find(p => p.id === id);
    cart.push(product);
    document.getElementById("cart-count").textContent = cart.length;
    renderCart();
  };

  window.toggleCart = () => {
    document.getElementById("cartModal").style.display =
      document.getElementById("cartModal").style.display === "flex" ? "none" : "flex";
  };

  function renderCart(){
    const items = document.getElementById("cartItems");
    const total = cart.reduce((s,p)=>s+p.price,0);
    items.innerHTML = cart.map(p=>`<p>• ${p.name} – ${clp(p.price)}</p>`).join("");
    document.getElementById("cartTotal").textContent = clp(total);
  }

});
