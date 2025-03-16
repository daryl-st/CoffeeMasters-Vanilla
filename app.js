// It's better to wait for the event for manipulation
window.addEventListener("DOMContentLoaded", () => {
    let nav = document.querySelector("nav");
    nav.innerHTML = `
        <h2> Hello DOM </h2>
        <p> This is a string from the JS </p>
    `
})