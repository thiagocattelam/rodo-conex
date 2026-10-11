function criarCarrossel(seletorBloco) {
  const itens = [...document.querySelectorAll(`${seletorBloco}__item`)];
  const setaProxima = document.querySelector(`${seletorBloco}__seta--proxima`);
  const setaAnterior = document.querySelector(
    `${seletorBloco}__seta--anterior`,
  );
  const classeAtivo = `${seletorBloco.slice(1)}__item--ativo`;

  if (itens.length === 0) return;

  // Descobre qual item já começa ativo no HTML
  let indiceAtual = itens.findIndex((item) =>
    item.classList.contains(classeAtivo),
  );

  // Se nenhum estiver ativo, ativa o primeiro
  if (indiceAtual === -1) {
    indiceAtual = 0;
    itens[0].classList.add(classeAtivo);
  }

  function girar(novoIndice) {
    itens[indiceAtual].classList.remove(classeAtivo);
    indiceAtual = (novoIndice + itens.length) % itens.length;
    itens[indiceAtual].classList.add(classeAtivo);
  }

  // ?. só liga o evento se a seta existir
  setaProxima?.addEventListener("click", () => girar(indiceAtual + 1));
  setaAnterior?.addEventListener("click", () => girar(indiceAtual - 1));
}

criarCarrossel(".destaques");
criarCarrossel(".servicos-fale-conosco");
criarCarrossel(".clientes");
