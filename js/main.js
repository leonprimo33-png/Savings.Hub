/* Funciones del sitio: filtros, carrito y formularios. */
"use strict";

const WHATSAPP_NUMBER = "5493564305591"; // Argentina: revisar que el número completo sea correcto antes de publicar.
const CART_KEY = "savingsHubCart";

function readCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch (error) { return []; }
}
function saveCart(cart) {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (error) {}
  renderCart();
}
function productData(card) {
  return { id: card.dataset.id, name: card.dataset.name, category: card.dataset.category, quantity: 1 };
}
function addProduct(card) {
  const cart = readCart();
  const product = productData(card);
  const found = cart.find(item => item.id === product.id);
  if (found) found.quantity += 1; else cart.push(product);
  saveCart(cart);
  const button = card.querySelector(".add-to-cart");
  if (button) {
    const original = button.textContent;
    button.textContent = "Agregado ✓";
    window.setTimeout(() => { button.textContent = original; }, 1000);
  }
}
function changeQuantity(id, amount) {
  const cart = readCart();
  const item = cart.find(product => product.id === id);
  if (!item) return;
  item.quantity += amount;
  saveCart(cart.filter(product => product.quantity > 0));
}
function renderCart() {
  const cart = readCart();
  document.querySelectorAll("[data-cart-count]").forEach(el => {
    el.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  });
  const container = document.getElementById("cartItems");
  if (!container) return;
  if (!cart.length) {
    container.innerHTML = '<p class="empty-state">Todavía no agregaste productos.</p>';
    return;
  }
  container.innerHTML = cart.map(item => `
    <div class="cart-row">
      <div><strong>${escapeHtml(item.name)}</strong><small>${item.quantity} unidad(es)</small></div>
      <div class="quantity-control">
        <button type="button" data-minus="${item.id}" aria-label="Quitar una unidad de ${escapeHtml(item.name)}">−</button>
        <span>${item.quantity}</span>
        <button type="button" data-plus="${item.id}" aria-label="Agregar una unidad de ${escapeHtml(item.name)}">+</button>
      </div>
    </div>`).join("");
  container.querySelectorAll("[data-minus]").forEach(btn => btn.addEventListener("click", () => changeQuantity(btn.dataset.minus, -1)));
  container.querySelectorAll("[data-plus]").forEach(btn => btn.addEventListener("click", () => changeQuantity(btn.dataset.plus, 1)));
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));
}
function sendWhatsApp(text) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
  document.querySelectorAll(".product-card .add-to-cart").forEach(button => {
    button.addEventListener("click", () => addProduct(button.closest(".product-card")));
  });
  const categoryFilter = document.getElementById("categoryFilter");
  const searchInput = document.getElementById("productSearch");
  const grid = document.getElementById("productGrid");
  const noProducts = document.getElementById("noProducts");
  function filterProducts() {
    if (!grid) return;
    const category = categoryFilter ? categoryFilter.value : "all";
    const term = searchInput ? searchInput.value.trim().toLocaleLowerCase("es") : "";
    let visible = 0;
    grid.querySelectorAll(".product-card").forEach(card => {
      const matchesCategory = category === "all" || card.dataset.category === category;
      const matchesTerm = card.dataset.name.toLocaleLowerCase("es").includes(term);
      card.hidden = !(matchesCategory && matchesTerm);
      if (!card.hidden) visible++;
    });
    if (noProducts) noProducts.classList.toggle("d-none", visible > 0);
  }
  if (categoryFilter) categoryFilter.addEventListener("change", filterProducts);
  if (searchInput) searchInput.addEventListener("input", filterProducts);
  renderCart();

  const clearCart = document.getElementById("clearCart");
  if (clearCart) clearCart.addEventListener("click", () => saveCart([]));
  const whatsappOrder = document.getElementById("whatsappOrder");
  if (whatsappOrder) whatsappOrder.addEventListener("click", () => {
    const cart = readCart();
    if (!cart.length) {
      alert("Primero agregá al menos un producto al carrito.");
      return;
    }
    const lines = cart.map(item => `• ${item.name} — cantidad: ${item.quantity}`).join("\n");
    sendWhatsApp(`Hola, Savings.Hub. Quiero consultar por este pedido:\n\n${lines}\n\n¿Me confirman disponibilidad y precios?`);
  });

  const contactForm = document.getElementById("contactForm");
  if (contactForm) contactForm.addEventListener("submit", event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const data = new FormData(contactForm);
    const message = `Hola, Savings.Hub. Mi consulta es:\n\nNombre: ${data.get("nombre")}\nCorreo: ${data.get("email")}\nTeléfono: ${data.get("telefono") || "No indicado"}\nMotivo: ${data.get("motivo")}\nMensaje: ${data.get("mensaje")}`;
    sendWhatsApp(message);
  });
});
