/**
 * Serialize JSON for an inline script without allowing HTML parser breakouts.
 * The escaped characters remain equivalent when parsed as JSON.
 * @param {unknown} value
 */
export function serializeJsonLd(value) {
  return JSON.stringify(value)
    .replaceAll("<", "\\u003C")
    .replaceAll(">", "\\u003E")
    .replaceAll("&", "\\u0026");
}

/** @param {unknown} value */
export function renderJsonLd(value) {
  return `<script type="application/ld+json">${serializeJsonLd(value)}</script>`;
}
