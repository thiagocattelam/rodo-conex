const menuButton = document.querySelector(".header__botao");
const headerMenu = document.querySelector(".header__menu");

menuButton.addEventListener("click", () => {
  headerMenu.classList.toggle("header__menu--aberto");
  menuButton.classList.toggle("header__botao--aberto");
});

function fecharDrawer() {
  headerMenu.classList.remove("header__menu--aberto");
  menuButton.classList.remove("header__botao--aberto");
}

document.addEventListener("click", (event) => {
  if (
    !headerMenu.contains(event.target) &&
    !menuButton.contains(event.target)
  ) {
    fecharDrawer();
  }
});
