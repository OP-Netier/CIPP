// src/utils/overrides.js
export function applyOverrides() {
  try {
    // 1. Replace Logo <img>
    const logo = document.querySelector('img[alt="Logo"][src^="data:image"]');
    if (logo) {
      logo.src = "https://partner.netier.cloud/logo.svg";
    }

    // 2. Hide the element containing "This application is sponsored by"
    const sponsored = Array.from(document.querySelectorAll("body *")).find(
      (el) =>
        el.textContent &&
        el.textContent.includes("This application is sponsored by")
    );
    if (sponsored) {
      sponsored.style.display = "none";
    }

    // 3. Hide all images with alt="sponsor"
    document.querySelectorAll('img[alt="sponsor"]').forEach((img) => {
      img.style.display = "none";
    });

    // 4. Replace CSS color rgb(247, 127, 0) with #ED1C24
    document.querySelectorAll("*").forEach((el) => {
      const style = window.getComputedStyle(el);
      if (style.color === "rgb(247, 127, 0)") {
        el.style.color = "#ED1C24";
      }
      if (style.backgroundColor === "rgb(247, 127, 0)") {
        el.style.backgroundColor = "#ED1C24";
      }
    });
  } catch (err) {
    console.error("applyOverrides failed:", err);
  }
}
