// Carregado no <head>, sem defer e antes das tags: o consentimento precisa
// estar definido antes do Google tag e do Meta Pixel rodarem.
const CHAVE_COOKIES = "rodoconex-cookies";

function lerEscolhaCookies() {
  try {
    return localStorage.getItem(CHAVE_COOKIES);
  } catch {
    return null;
  }
}

function salvarEscolhaCookies(escolha) {
  try {
    localStorage.setItem(CHAVE_COOKIES, escolha);
  } catch {
    // Sem armazenamento, a escolha vale só para esta página.
  }
}

function consentimentoGoogle(valor) {
  return {
    ad_storage: valor,
    ad_user_data: valor,
    ad_personalization: valor,
    analytics_storage: valor,
  };
}

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}

// Lido pelo Meta Pixel no <head> de cada página.
window.cookiesAceitos = lerEscolhaCookies() === "aceito";

gtag(
  "consent",
  "default",
  consentimentoGoogle(window.cookiesAceitos ? "granted" : "denied"),
);

function aplicarEscolhaCookies(escolha) {
  const aceitou = escolha === "aceito";

  salvarEscolhaCookies(escolha);
  window.cookiesAceitos = aceitou;
  gtag("consent", "update", consentimentoGoogle(aceitou ? "granted" : "denied"));
  fbq("consent", aceitou ? "grant" : "revoke");
  document.querySelector(".cookies")?.remove();
}

function criarBotaoCookies(texto, classe, escolha) {
  const botao = document.createElement("button");

  botao.type = "button";
  botao.className = `cookies__botao ${classe}`;
  botao.textContent = texto;
  botao.addEventListener("click", () => aplicarEscolhaCookies(escolha));

  return botao;
}

function mostrarAvisoCookies() {
  if (document.querySelector(".cookies")) return;

  const aviso = document.createElement("section");
  const texto = document.createElement("p");
  const acoes = document.createElement("div");

  aviso.className = "cookies";
  aviso.setAttribute("aria-label", "Aviso de cookies");
  texto.textContent =
    "Usamos cookies essenciais para o funcionamento do site e, com a sua permissão, cookies de análise e marketing para melhorar sua experiência e personalizar conteúdos. Você pode aceitar todos ou recusar os não essenciais.";
  acoes.className = "cookies__acoes";
  acoes.append(
    criarBotaoCookies(
      "Recusar não essenciais",
      "cookies__botao--recusar",
      "recusado",
    ),
    criarBotaoCookies("Aceitar todos", "cookies__botao--aceitar", "aceito"),
  );
  aviso.append(texto, acoes);
  document.body.append(aviso);
}

function criarPreferenciasCookies() {
  const textoRodape = document.querySelector(".footer__dolfinos p");
  if (!textoRodape) return;

  const botao = document.createElement("button");

  botao.type = "button";
  botao.className = "footer__cookies";
  botao.textContent = "Preferências de cookies";
  botao.addEventListener("click", mostrarAvisoCookies);
  textoRodape.after(botao);
}

document.addEventListener("DOMContentLoaded", () => {
  criarPreferenciasCookies();

  if (!lerEscolhaCookies()) {
    mostrarAvisoCookies();
  }
});
