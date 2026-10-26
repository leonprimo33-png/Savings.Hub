// Funciones pequeñas del sitio: filtro de productos y formulario de contacto.
document.addEventListener("DOMContentLoaded", () => {
  const filter = document.querySelector("#categoryFilter");
  const productCards = document.querySelectorAll(".product-card");
  const emptyState = document.querySelector("#emptyState");

  if (filter && productCards.length) {
    filter.addEventListener("change", () => {
      let visible = 0;
      productCards.forEach((card) => {
        const show = filter.value === "todos" || card.dataset.category === filter.value;
        card.classList.toggle("d-none", !show);
        if (show) visible++;
      });
      if (emptyState) emptyState.classList.toggle("d-none", visible !== 0);
    });
  }

  const contactForm = document.querySelector("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      const formData = new FormData(contactForm);
      const message = [
        "Hola, soy " + formData.get("name") + ".",
        "Mi correo: " + formData.get("email"),
        formData.get("phone") ? "Mi teléfono: " + formData.get("phone") : "",
        "Motivo: " + formData.get("topic"),
        "Mensaje: " + formData.get("message")
      ].filter(Boolean).join("\n");
      const notice = document.querySelector("#formNotice");
      if (notice) notice.textContent = "Se abrirá WhatsApp con el mensaje preparado. Revisalo antes de enviarlo.";
      window.open("https://wa.me/5493564305591?text=" + encodeURIComponent(message), "_blank", "noopener");
    });
  }
});
