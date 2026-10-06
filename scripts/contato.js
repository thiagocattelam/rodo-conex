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
