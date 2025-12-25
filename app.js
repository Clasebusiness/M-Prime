document.addEventListener("DOMContentLoaded", () => {

  // ✅ Cambia este número al WhatsApp real (formato internacional, sin +)
  const WHATSAPP_NUMBER = "569XXXXXXXX"; // ejemplo: 56912345678

  // Productos (mezcla ropa, accesorios, tech, kids)
  const products = [
    { id: 1,  name:"Polera M-Prime Edición YouTube", price:14990, delivery:"24–72 hrs", rating:4.9, cat:"fashion", youtube:true,  img:"https://images.unsplash.com/photo-1520975958225-2c9f0b48b4f1?w=900" },
    { id: 2,  name:"Gorro / Jockey M-Prime",           price:9990,  delivery:"24–72 hrs", rating:4.7, cat:"accessories", youtube:true, img:"https://images.unsplash.com/photo-1528701800489-20be9c2f1e2b?w=900" },
    { id: 3,  name:"Audífonos Bluetooth",              price:29990, delivery:"24–48 hrs", rating:4.7, cat:"tech", youtube:true,  img:"https://images.unsplash.com/photo-1518441902117-f0a00f9daceb?w=900" },
    { id: 4,  name:"Smartwatch Fitness",               price:34990, delivery:"48–72 hrs", rating:4.5, cat:"tech", youtube:false, img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900" },
    { id: 5,  name:"Set Pulseras Kids (Pack)",          price:7990,  delivery:"24–72 hrs", rating:4.6, cat:"kids", youtube:false, img:"https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=900" },
    { id: 6,  name:"Botella Térmica M-Prime",           price:13990, delivery:"48–72 hrs", rating:4.6, cat:"kids", youtube:true,  img:"https://images.unsplash.com/photo-1526401485004-2aa6d8b9342d?w=900" },
    { id: 7,  name:"Mochila Urbana",                   price:24990, delivery:"24–72 hrs", rating:4.6, cat:"accessories", youtube:false, img:"https://images.unsplash.com/photo-1526481280695-3c687fd5432c?w=900" },
    { id: 8,  name:"Mouse Inalámbrico Gamer",          price:12990, delivery:"24–72 hrs", rating:4.4, cat:"tech", youtube:false, img:"https://images.unsplash.com/photo-1527814050087-3793815479db?w=900" },
    { id: 9,  name:"Polerón Kids (Color Pop)",          price:21990, delivery:"48–96 hrs", rating:4.8, cat:"fashion", youtube:false, img:"https://images.unsplash.com/photo-1520975682031-a7a1a6f5f5cb?w=900" },
    { id: 10, name:"Lentes / Antiparras Cool",          price:10990, delivery:"24–72 hrs", rating:4.5, cat:"accessories", youtube:true, img:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=900" },
    { id: 11, name:"Sticker Pack M-Prime",              price:3990,  delivery:"24–48 hrs", rating:4.9, cat:"kids", youtube:true,  img:"https://images.unsplash.com/photo-1520975693416-35a4a6d6d9b3?w=900" },
    { id: 12, name:"Cinturón / Correa Urbana",          price:8990,  delivery:"24–72 hrs", rating:4.4, cat:"accessories", youtube:false, img:"https://images.unsplash.com/photo-1520975861882-1d97c5d3d2df?w=900" }
  ];

  // Carrito con cantidades
  const cart = new Map(); // id -> {product, qty}

  const grid = document.getElementById("productsGrid");
  const searchInput = document.getElementById("searchInput");
  const heroMini = document.getElementById("heroMini");

  const clp = n => new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
  }).format(n);

  // =============== RENDER ===============
  function renderProducts(list){
    grid.innerHTML = list.map(p => `
      <article class="product">
        <div class="product-media">
          <span class="badge">${labelCat(p.cat)}</span>
          ${p.youtube ? `<span class="badge video">🎬 Visto en YouTube</span>` : ``}
          <img src="${p.img}" alt="${escapeHtml(p.name)}" loading="lazy">
        </div>

        <div class="product-body">
          <div class="product-title">${escapeHtml(p.name)}</div>
          <div class="product-price">${clp(p.price)}</div>
          <div class="meta-row">
            <span>🚚 ${p.delivery}</span>
            <span class="rating"><span class="star">★</span> ${p.rating}</span>
          </div>
        </div>

        <div class="product-actions">
          <button class="add-btn" onclick="addToCart(${p.id})">Agregar al carrito</button>
        </div>
      </article>
    `).join("");

    buildSeoJsonLd(list);
  }

  function renderHeroMini(){
    // toma 3 productos top por rating
    const top = [...products].sort((a,b)=>b.rating-a.rating).slice(0,3);
    heroMini.innerHTML = top.map(p => `
      <div class="mini" role="button" tabindex="0" onclick="scrollToProducts(); highlightProduct(${p.id});">
        <img src="${p.img}" alt="${escapeHtml(p.name)}" loading="lazy">
        <div>
          <strong>${escapeHtml(p.name)}</strong>
          <div class="muted">${clp(p.price)} · ⭐ ${p.rating}</div>
        </div>
      </div>
    `).join("");
  }

  // =============== FILTROS + TEMA ===============
  let currentCategory = "all";

  window.filterCategory = (cat) => {
    currentCategory = cat;
    applyTheme(cat);

    const q = (searchInput.value || "").trim().toLowerCase();
    const base = (cat === "all") ? products : products.filter(p => p.cat === cat);
    const filtered = q ? base.filter(p => p.name.toLowerCase().includes(q)) : base;

    renderProducts(filtered);
    scrollToProducts();
  };

  function applyTheme(cat){
    const body = document.body;
    body.classList.remove("theme-default","theme-tech","theme-kids","theme-fashion","theme-accessories");

    if(cat === "tech") body.classList.add("theme-tech");
    else if(cat === "kids") body.classList.add("theme-kids");
    else if(cat === "fashion") body.classList.add("theme-fashion");
    else if(cat === "accessories") body.classList.add("theme-accessories");
    else body.classList.add("theme-default");
  }

  function labelCat(cat){
    const map = {
      tech: "Tecnología",
      kids: "Kids",
      fashion: "Ropa",
      accessories: "Accesorios"
    };
    return map[cat] || "Destacado";
  }

  // =============== BUSCADOR ===============
  searchInput?.addEventListener("input", () => {
    filterCategory(currentCategory);
  });

  // Atajo ⌘K / Ctrl+K para foco en buscador
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      searchInput.focus();
    }
  });

  // =============== CARRITO ===============
  window.addToCart = (id) => {
    const p = products.find(x => x.id === id);
    if(!p) return;

    const item = cart.get(id);
    if(item) item.qty += 1;
    else cart.set(id, { product: p, qty: 1 });

    updateCartUI(true);
  };

  function removeFromCart(id){
    const item = cart.get(id);
    if(!item) return;
    item.qty -= 1;
    if(item.qty <= 0) cart.delete(id);
    updateCartUI();
  }

  function deleteItem(id){
    cart.delete(id);
    updateCartUI();
  }

  window.toggleCart = () => {
    const modal = document.getElementById("cartModal");
    const isOpen = modal.style.display === "flex";
    modal.style.display = isOpen ? "none" : "flex";
  };

  function updateCartUI(openIfAdd=false){
    const count = [...cart.values()].reduce((s,i)=>s+i.qty,0);
    document.getElementById("cart-count").textContent = count;

    const itemsEl = document.getElementById("cartItems");
    const qtyEl = document.getElementById("cartQty");
    const totalEl = document.getElementById("cartTotal");
    const waBtn = document.getElementById("whatsappBtn");

    qtyEl.textContent = count;

    if(cart.size === 0){
      itemsEl.innerHTML = `<div class="muted" style="text-align:center;padding:14px;">Tu carrito está vacío 🛒</div>`;
      totalEl.textContent = clp(0);
      waBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quiero comprar en M-Prime. ¿Me ayudas?")}`;
      return;
    }

    const rows = [];
    let total = 0;

    cart.forEach(({product, qty}) => {
      total += product.price * qty;
      rows.push(`
        <div class="cart-item">
          <img src="${product.img}" alt="${escapeHtml(product.name)}" loading="lazy">
          <div>
            <strong>${escapeHtml(product.name)}</strong>
            <div class="muted">${clp(product.price)} · 🚚 ${product.delivery}</div>
            <div class="qty-controls">
              <button class="qbtn" onclick="window.__remove(${product.id})">−</button>
              <strong>${qty}</strong>
              <button class="qbtn" onclick="window.__add(${product.id})">+</button>
              <button class="qbtn" onclick="window.__del(${product.id})" title="Quitar">🗑️</button>
            </div>
          </div>
          <strong>${clp(product.price * qty)}</strong>
        </div>
      `);
    });

    itemsEl.innerHTML = rows.join("");
    totalEl.textContent = clp(total);

    const message = buildWhatsAppMessage(total);
    waBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    if(openIfAdd){
      const modal = document.getElementById("cartModal");
      modal.style.display = "flex";
    }
  }

  window.__add = (id) => window.addToCart(id);
  window.__remove = (id) => removeFromCart(id);
  window.__del = (id) => deleteItem(id);

  function buildWhatsAppMessage(total){
    const lines = [];
    lines.push("Hola 👋 Quiero comprar en M-Prime:");
    cart.forEach(({product, qty}) => {
      lines.push(`- ${product.name} x${qty} (${clp(product.price * qty)})`);
    });
    lines.push(`Total: ${clp(total)}`);
    lines.push("¿Me confirmas disponibilidad y envío? 🚚");
    return lines.join("\n");
  }

  // =============== NAVEGACIÓN ===============
  window.goHome = () => window.scrollTo({top:0, behavior:"smooth"});
  window.scrollToProducts = () => document.getElementById("productos")?.scrollIntoView({behavior:"smooth"});

  // Nav shadow scroll
  window.addEventListener("scroll", () => {
    document.getElementById("navbar")?.classList.toggle("scrolled", window.scrollY > 10);
  });

  // Highlight product (mini top)
  window.highlightProduct = (id) => {
    // solo “guía visual”: filtra para que aparezca arriba si no está visible
    // aquí lo dejamos simple para no complicar UX
  };

  // =============== SEO JSON-LD ===============
  function buildSeoJsonLd(currentList){
    const org = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "M-Prime",
      "url": "https://tudominio.cl",
      "sameAs": ["https://www.youtube.com/@dominickcrea8697"]
    };

    const itemList = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Productos M-Prime",
      "itemListElement": currentList.slice(0, 24).map((p, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "Product",
          "name": p.name,
          "image": p.img,
          "category": labelCat(p.cat),
          "offers": {
            "@type": "Offer",
            "priceCurrency": "CLP",
            "price": p.price,
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": p.rating,
            "reviewCount": Math.max(10, Math.round(p.rating * 12))
          }
        }
      }))
    };

    const faq = {
      "@context":"https://schema.org",
      "@type":"FAQPage",
      "mainEntity":[
        {
          "@type":"Question",
          "name":"¿Cuánto demora la entrega?",
          "acceptedAnswer":{"@type":"Answer","text":"Mostramos una estimación de entrega en cada producto (por ejemplo 24–96 hrs), depende del producto y comuna."}
        },
        {
          "@type":"Question",
          "name":"¿Cómo compro en M-Prime?",
          "acceptedAnswer":{"@type":"Answer","text":"Agrega productos al carrito y presiona “Comprar por WhatsApp”. El mensaje queda listo para enviar con el detalle del pedido."}
        },
        {
          "@type":"Question",
          "name":"¿Venden ropa y accesorios?",
          "acceptedAnswer":{"@type":"Answer","text":"Sí. M-Prime incluye ropa, accesorios, tecnología y artículos para kids, con categorías para filtrar rápidamente."}
        }
      ]
    };

    const json = [org, itemList, faq];
    const seoEl = document.getElementById("seoJson");
    if(seoEl) seoEl.textContent = JSON.stringify(json);
  }

  // =============== UTILS ===============
  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, s => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    }[s]));
  }

  // Init
  renderHeroMini();
  applyTheme("all");
  renderProducts(products);
  updateCartUI();
});
