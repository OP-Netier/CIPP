// src/utils/overrides.js
let overridesApplied = false;
let mutationObserver = null;

export function applyOverrides({ force = false } = {}) {
  try {
    if (overridesApplied && !force) return;

    ensureStyleTag();
    patchLogo();
    hideSponsoredText();
    hideSponsorImages();

    overridesApplied = true;
  } catch (err) {
    console.error("[overrides] apply failed:", err);
  }
}

export function teardownOverrides() {
  try {
    const style = document.getElementById("cipp-override-style");
    if (style) style.remove();
    if (mutationObserver) {
      mutationObserver.disconnect();
      mutationObserver = null;
    }
    overridesApplied = false;
  } catch (e) {
    console.warn("[overrides] teardown failed:", e);
  }
}

function ensureStyleTag() {
  if (document.getElementById("cipp-override-style")) return;
  const style = document.createElement("style");
  style.id = "cipp-override-style";
  style.textContent = `
    /* Replace brand color (runtime) */
    :root {
      --cipp-brand-override: #ED1C24;
    }

    /* Example: if original UI uses rgb(247, 127, 0) inline, override via attribute selector heuristic */
    *[style*="rgb(247, 127, 0)"] {
      color: var(--cipp-brand-override) !important;
      caret-color: var(--cipp-brand-override) !important;
    }
    *[style*="background: rgb(247, 127, 0)"],
    *[style*="background-color: rgb(247, 127, 0)"] {
      background: var(--cipp-brand-override) !important;
    }

    /* If there are known classnames you can target them directly (add here for precision) */
    /* .MuiButton-containedPrimary { background: var(--cipp-brand-override) !important; } */
  `;
  document.head.appendChild(style);
}

function patchLogo() {
  // If already replaced, skip
  const existing = document.querySelector('img[alt="Logo"][data-overridden="1"]');
  if (existing) return;

  const swap = (img) => {
    if (!img || img.dataset.overridden === "1") return;
    if (img.src.startsWith("data:image")) {
      img.src = "https://partner.netier.cloud/logo.svg";
      img.dataset.overridden = "1";
    }
  };

  // Immediate attempt
  const immediate = document.querySelector('img[alt="Logo"][src^="data:image"]');
  if (immediate) swap(immediate);

  // Observe future inserts (one-time if not found yet)
  if (!mutationObserver) {
    mutationObserver = new MutationObserver((muts) => {
      for (const mut of muts) {
        mut.addedNodes.forEach((n) => {
          if (n.nodeType === 1) {
            if (n.matches?.('img[alt="Logo"][src^="data:image"]')) swap(n);
            n.querySelectorAll?.('img[alt="Logo"][src^="data:image"]').forEach(swap);
          }
        });
      }
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
  }
}

function hideSponsoredText() {
  // Use a marker to avoid repeated scans
  if (document.body.dataset.sponsorTextProcessed === "1") return;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const phrase = "This application is sponsored by";
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.nodeValue && node.nodeValue.includes(phrase)) {
      const container = node.parentElement;
      if (container) {
        container.style.display = "none";
      }
    }
  }
  document.body.dataset.sponsorTextProcessed = "1";
}

function hideSponsorImages() {
  document.querySelectorAll('img[alt="sponsor"]:not([data-overridden])').forEach((img) => {
    img.style.display = "none";
    img.dataset.overridden = "1";
  });
}

// Optional: call this on route changes if your app re-renders content
export function reapplyOverridesOnRouteChange() {
  // Force re-check dynamic content without redoing global setups
  hideSponsoredText();
  hideSponsorImages();
  patchLogo();
}
