const PRODUCTS = [
  { name:"Audífonos Bluetooth", price:29990, delivery:"24–48 hrs", rating:4.7, img:"https://images.unsplash.com/photo-1518441902117-f0a00f9daceb?w=800"},
  { name:"Smartwatch Fitness", price:34990, delivery:"48–72 hrs", rating:4.5, img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"},
  { name:"Mochila Urbana", price:24990, delivery:"24–72 hrs", rating:4.6, img:"https://images.unsplash.com/photo-1526481280695-3c687fd5432c?w=800"},
  { name:"Cafetera Italiana", price:15990, delivery:"48–96 hrs", rating:4.4, img:"https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=800"},
  { name:"Lámpara LED Escritorio", price:12990, delivery:"24–72 hrs", rating:4.3, img:"https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800"},
  { name:"Bolso Urbano", price:11990, delivery:"24–48 hrs", rating:4.8, img:"https://images.unsplash.com/photo-1585386959984-a41552231693?w=800"},
  { name:"Botella Térmica", price:13990, delivery:"48–72 hrs", rating:4.6, img:"https://images.unsplash.com/photo-1526401485004-2aa6d8b9342d?w=800"},
  { name:"Mouse Inalámbrico", price:9990, delivery:"24–72 hrs", rating:4.4, img:"https://images.unsplash.com/photo-1527814050087-3793815479db?w=800"},
];

const grid = document.getElementById("productsGrid");

function clp(n){
  return new Intl.NumberFormat("es-CL",{style:"currency",currency:"CLP",maximumFractionDigits:0}).format(n);
}

grid.innerHTML = PRODUCTS.map(p=>`
  <article class="product">
    <img src="${p.img}" alt="${p.name}">
    <h3>${p.name}</h3>
    <div class="price">${clp(p.price)}</div>
    <div class="meta">🚚 ${p.delivery}</div>
    <div class="rating">⭐ ${p.rating}</div>
    <button>Agregar al carrito</button>
  </article>
`).join("");
