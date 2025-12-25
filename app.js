document.addEventListener("DOMContentLoaded", () => {

  const products = [
    { id:1, name:"Audífonos Bluetooth", price:29990, cat:"tech", img:"https://images.unsplash.com/photo-1518441902117-f0a00f9daceb?w=800" },
    { id:2, name:"Smartwatch Fitness", price:34990, cat:"tech", img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800" },
    { id:3, name:"Mochila Urbana", price:24990, cat:"accesorios", img:"https://images.unsplash.com/photo-1526481280695-3c687fd5432c?w=800" },
    { id:4, name:"Cafetera Italiana", price:15990, cat:"hogar", img:"https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=800" },
    { id:5, name:"Lámpara LED Kids", price:12990, cat:"kids", img:"https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800" },
    { id:6, name:"Polera M-Prime", price:14990, cat:"ropa", img:"https://images.unsplash.com/photo-1520975916090-3105956dac38?w=800" }
  ];

  const grid = document.getElementById("productsGrid");
  const cart = [];
  const cartPanel = document.getElementById("cartPanel");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.getElementById("cartCount");

  const clp = n => new Intl.NumberFormat("es-CL",{style:"currency",currency:"CLP",maximumFractionDigits:0}).format(n);

  function renderProducts(list) {
    grid.innerHTML = list.map(p => `
      <article class="product">
        <div class="product-img">
          <img src="${p.img}" alt="${p.name}">
        </div>
        <h3>${p.name}</h3>
        <div class="price">${clp(p.price)}</div>
        <div class="rating">⭐ 4.${Math.floor(Math.random()*5)+3}</div>
        <button onclick="addToCart(${p.id})">Agregar al carrito</button>
      </article>
    `).join("");
  }

  window.addToCart = id => {
    const prod = products.find(p => p.id === id);
    cart.push(prod);
    updateCart();
  };

  function updateCart() {
    cartCount.textContent = cart.length;
    cartItems.innerHTML = cart.map(p => `<li>${p.name} - ${clp(p.price)}</li>`).join("");
    const total = cart.reduce((s,p)=>s+p.price,0);
    cartTotal.textContent = clp(total);

    const msg = encodeURIComponent(
      cart.map(p=>`${p.name} - ${clp(p.price)}`).join("\n") + `\nTotal: ${clp(total)}`
    );
    document.getElementById("whatsappBtn").href = `https://wa.me/?text=${msg}`;
  }

  document.getElementById("cartBtn").onclick = () => cartPanel.classList.toggle("hidden");
  document.getElementById("closeCart").onclick = () => cartPanel.classList.add("hidden");

  document.querySelectorAll(".nav-links li").forEach(li=>{
    li.onclick = ()=>{
      document.querySelectorAll(".nav-links li").forEach(l=>l.classList.remove("active"));
      li.classList.add("active");
      const cat = li.dataset.cat;
      renderProducts(cat==="all" ? products : products.filter(p=>p.cat===cat));
    };
  });

  renderProducts(products);

});
