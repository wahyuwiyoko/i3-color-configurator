import updateElementColor from "./element-color-update.js";
import * as theme from "./theme.js";
import updateCode from "./code.js";

function loadColor(color) {
  for (const input of document.getElementsByTagName("input")) {
    // Change every color picker value
    input.value = color[input.id];

    updateElementColor(input.value, input.dataset.state, input.dataset.element);
  }
}

async function setSelectedTheme(themeElement, allInputColor) {
  const selectedTheme = await theme.importTheme(`./assets/themes/${themeElement.value}.json`);
  loadColor(theme.formatted(selectedTheme));
  updateCode(allInputColor());
}

export { loadColor as color, setSelectedTheme as selectedTheme };
