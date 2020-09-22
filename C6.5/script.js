const btn = document.querySelector(".btn");

btn.addEventListener('click', () => {
    alert(`display width: ${window.screen.width} pixels, display height is ${window.screen.height} pixels`);
})