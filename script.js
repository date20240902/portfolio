const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav-list");
navToggle?.addEventListener("click", () => {
  navList?.classList.toggle("open");
});

window.addEventListener("click", (event) => {
  if (
    navList?.classList.contains("open") &&
    !event.composedPath().some((el) => el === navToggle || el === navList)
  ) {
    navList.classList.remove("open");
  }
});

