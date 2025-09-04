// src/utils/overrides.js
export function applyOverrides() {
  // 1. Replace Logo <img>
  const logo = document.querySelector('img[alt="Logo"][src^="data:image/jpeg"]');
  if (logo) {
    logo.src = "https://partner.netier.cloud/logo.svg"; // Replace with your URL
  }

  // 2. Hide the element containing "This application is sponsored by"
  const sponsored = Array.from(document.querySelectorAll("body *"))
    .find(el => el.textContent?.includes("This application is sponsored by"));
  if (sponsored) {
    sponsored.style.display = "none";
  }

  // 3. Hide all images with alt="sponsor"
  document.querySelectorAll('img[alt="sponsor"]').forEach(img => {
    img.style.display = "none";
  });

  // 4. Replace CSS color rgb(247, 127, 0) with #ED1C24
  const sheets = [...document.styleSheets];
  sheets.forEach(sheet => {
    try {
      [...sheet.cssRules].forEach(rule => {
        if (rule.style && rule.style.color === "rgb(247, 127, 0)") {
          rule.style.color = "#ED1C24";
        }
        if (rule.style && rule.style.backgroundColor === "rgb(247, 127, 0)") {
          rule.style.backgroundColor = "#ED1C24";
        }
      });
    } catch (e) {
      // Skip CORS-restricted stylesheets
    }
  });
}
