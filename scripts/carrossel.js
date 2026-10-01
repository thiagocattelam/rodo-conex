const itens = document.querySelectorAll(".destaques__item");
const setaProxima = document.querySelector(".destaques__seta--proxima");
const setaAnterior = document.querySelector(".destaques__seta--anterior");

let indiceAtual = 0;

function girarCarrossel(novoIndice) {
  itens[indiceAtual].classList.remove("destaques__item--ativo");
  indiceAtual = (novoIndice + itens.length) % itens.length;
  itens[indiceAtual].classList.add("destaques__item--ativo");
}

setaProxima.addEventListener("click", () => girarCarrossel(indiceAtual + 1));
setaAnterior.addEventListener("click", () => girarCarrossel(indiceAtual - 1));
