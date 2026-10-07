// ---- Edit your products here ----
// Put your own photos in the images folder and change the "img" path.
const products = [
  { id: 1, name: "Ceramic mug",     price: 299,  img: "Mug-new.jpg",        tag: "Bestseller", desc: "Hand-finished mug that keeps your tea warm longer." },
  { id: 2, name: "Cotton t-shirt",  price: 499,  img: "Tshirt.jpg",     tag: "",           desc: "Soft, breathable and made for everyday wear." },
  { id: 3, name: "Canvas backpack", price: 1299, img: "images/product-backpack.svg",   tag: "New",        desc: "Roomy, sturdy and ready for work or travel." },
  { id: 4, name: "Table lamp",      price: 899,  img: "images/product-lamp.svg",       tag: "",           desc: "Warm light for your desk or bedside." },
  { id: 5, name: "Notebook",        price: 149,  img: "images/product-notebook.svg",   tag: "Bestseller", desc: "Thick pages and a hard cover that lasts." },
  { id: 6, name: "Sunglasses",      price: 699,  img: "images/product-sunglasses.svg", tag: "New",        desc: "Light frames with UV protection." },
];

let cart = JSON.parse(localStorage.getItem("cart") || "{}");
const money = n => "₹" + n.toLocaleString("en-IN");

const productsEl = document.getElementById("products");
const cartEl = document.getElementById("cart");
const itemsEl = document.getElementById("cart-items");

function renderProducts() {
  productsEl.innerHTML = products.map(p => `
    <article class="card">
      <div class="photo">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        ${p.tag ? `<span class="tag">${p.tag}</span>` : ""}
      </div>
      <div class="info">
        <h3>${p.name}</h3>
        <p class="desc">${p.desc}</p>
        <div class="row">
          <span class="price">${money(p.price)}</span>
          <button class="primary" data-add="${p.id}">Add to cart</button>
        </div>
      </div>
    </article>`).join("");
}

function renderCart() {
  const ids = Object.keys(cart);
  let total = 0, count = 0;
  itemsEl.innerHTML = ids.map(id => {
    const p = products.find(x => x.id == id);
    const qty = cart[id];
    total += p.price * qty;
    count += qty;
    return `
      <li>
        <img src="${p.img}" alt="">
        <span class="name">${p.name}<small>${money(p.price)}</small></span>
        <span class="qty">
          <button data-dec="${id}" aria-label="Remove one">−</button>${qty}
          <button data-inc="${id}" aria-label="Add one">+</button>
        </span>
      </li>`;
  }).join("");
  document.getElementById("total").textContent = money(total);
  document.getElementById("cart-count").textContent = count;
  document.getElementById("empty").style.display = ids.length ? "none" : "block";
  localStorage.setItem("cart", JSON.stringify(cart));
}

function change(id, delta) {
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  renderCart();
}

productsEl.addEventListener("click", e => {
  const id = e.target.dataset.add;
  if (id) { change(id, 1); cartEl.classList.add("open"); }
});
itemsEl.addEventListener("click", e => {
  if (e.target.dataset.inc) change(e.target.dataset.inc, 1);
  if (e.target.dataset.dec) change(e.target.dataset.dec, -1);
});
document.getElementById("cart-btn").onclick = () => cartEl.classList.add("open");
document.getElementById("close-cart").onclick = () => cartEl.classList.remove("open");
document.getElementById("checkout").onclick = () => {
  if (!Object.keys(cart).length) return alert("Your cart is empty.");
  alert("Thanks for your order! (This is a demo, no payment is taken.)");
  cart = {};
  renderCart();
  cartEl.classList.remove("open");
};

document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
renderCart();
