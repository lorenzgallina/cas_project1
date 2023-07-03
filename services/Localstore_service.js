
export function setdarkTheme() {
    localStorage.setItem("theme", "dark");
}

export function setlightTheme() {
    localStorage.setItem("theme", "light");
}

export function getTheme() {
    return localStorage.getItem("theme");
}