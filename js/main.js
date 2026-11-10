/* Le Delizie di Enea: menu mobile, modulo contatti, galleria */

// 1. Menu mobile
const btn = document.querySelector(".menu-btn");
const nav = document.getElementById("nav");
btn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  btn.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", e => {
  if (e.target.tagName === "A") { nav.classList.remove("open"); btn.setAttribute("aria-expanded", false); }
});

// 2. Modulo contatti: senza server apre il programma di posta con il messaggio gia' compilato.
//    Per l'invio diretto usa un servizio come Formspree o Netlify Forms.
const EMAIL = "info@tuodominio.it"; // TODO: la tua e-mail reale
const form = document.getElementById("form");
const status = document.getElementById("status");
form.addEventListener("submit", e => {
  e.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const d = new FormData(form);
  const body = `Nome: ${d.get("nome")}\nContatto: ${d.get("contatto")}\n\n${d.get("messaggio")}`;
  location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Richiesta dal sito")}&body=${encodeURIComponent(body)}`;
  status.textContent = "Si apre il tuo programma di posta: premi Invia per completare la richiesta.";
});

// 3. Anno nel footer
document.getElementById("year").textContent = new Date().getFullYear();

// 4. Galleria: nasconde le foto non ancora caricate e la sezione se e' vuota
const galleria = document.getElementById("galleria");
const check = () => { if (!galleria.querySelector("figure")) galleria.remove(); };
galleria.querySelectorAll("img").forEach(img => {
  const drop = () => { img.closest("figure").remove(); check(); };
  img.addEventListener("error", drop);
  if (img.complete && img.naturalWidth === 0 && img.getAttribute("loading") !== "lazy") drop();
});