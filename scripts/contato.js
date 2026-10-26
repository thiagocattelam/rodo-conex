const form = document.getElementById("form-contato");

document.getElementById("btn-whats").addEventListener("click", () => {
  if (!form.reportValidity()) return;

  const d = new FormData(form);
  const texto = `Olá! Sou ${d.get("nome")}, de ${d.get("cidade")}/${d.get("estado")}.\n${d.get("mensagem")}`;

  window.open(
    `https://wa.me/5551982059997?text=${encodeURIComponent(texto)}`,
    "_blank",
  );
});

const curriculo = document.getElementById("curriculo");

curriculo.addEventListener("change", () => {
  document.getElementById("anexo-nome").textContent =
    curriculo.files[0]?.name ?? "Anexe seu currículo";
});

document.querySelectorAll(".contato__form").forEach((f) => {
  f.addEventListener("submit", (e) => {
    if (f.querySelector("[name=g-recaptcha-response]")?.value) return;

    e.preventDefault();
    alert('Marque a caixa "Não sou um robô" antes de enviar.');
  });
});

const retorno = new URLSearchParams(location.search).get("status");

if (retorno === "enviado") alert("Mensagem enviada! Em breve entraremos em contato.");
if (retorno === "erro") alert("Não foi possível enviar. Tente novamente ou fale pelo WhatsApp.");
if (retorno) history.replaceState(null, "", location.pathname);
