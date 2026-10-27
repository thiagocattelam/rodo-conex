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

document.querySelectorAll("input[type=tel]").forEach((campo) => {
  campo.addEventListener("input", () => {
    let d = campo.value.replace(/\D/g, "");
    if (d.length > 11 && d.startsWith("55")) d = d.slice(2);
    d = d.slice(0, 11);

    const meio = d.length > 10 ? 5 : 4;
    const fim = d.slice(2 + meio);

    campo.value =
      d.length > 2
        ? `(${d.slice(0, 2)}) ${d.slice(2, 2 + meio)}${fim ? "-" + fim : ""}`
        : d && `(${d}`;
  });
});

function atualizarEnvio() {
  document.querySelectorAll(".contato__form").forEach((f) => {
    f.querySelector("[type=submit]").disabled =
      !f.querySelector("[name=g-recaptcha-response]")?.value;
  });
}

const mensagens = {
  enviado: "Mensagem enviada! Em breve entraremos em contato.",
  erro: "Não foi possível enviar. Tente novamente ou fale pelo WhatsApp.",
};

const retorno = new URLSearchParams(location.search).get("status");

if (mensagens[retorno]) {
  const aviso = document.createElement("div");
  aviso.className = `aviso aviso--${retorno}`;
  aviso.innerHTML = `<p>${mensagens[retorno]}</p><button type="button" aria-label="Fechar">×</button>`;
  document.body.append(aviso);

  const fechar = () => aviso.remove();
  aviso.querySelector("button").addEventListener("click", fechar);
  setTimeout(fechar, 6000);
}

if (retorno) history.replaceState(null, "", location.pathname);
