import { setdarkTheme, setlightTheme } from '../services/Localstore_service.js';

const themeButton = document.getElementById("theme-button");

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    setdarkTheme();
  } else {
    setlightTheme();
  }
});