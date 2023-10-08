import updateCode from "./code.js";
import * as theme from "./theme.js";
import updateElementColor from "./element-color-update.js";
import * as load from "./load-theme.js";

let colorPicker, inputId, targetState, targetElement;

// Load the startup() after page finish loaded
window.addEventListener("load", startup());

function getAllInputColor() {
  let inputTags = {};

  for (const inputTag of document.querySelectorAll("input")) {
    if (inputTag.id) {
      inputTags[inputTag.id] = inputTag.value;
    }
  }

  return inputTags;
}

function startup() {
  load.color(theme.formatted(theme.defaultTheme));
  updateCode(getAllInputColor());
}

function changeColor() {
  colorPicker = document.getElementById(inputId);
  colorPicker.addEventListener("change", updateElementColor(colorPicker.value, targetState, targetElement));
  colorPicker.addEventListener("change", updateCode(getAllInputColor()));
}

document.querySelectorAll("input[type=color]").forEach((element) => {
  element.addEventListener("change", () => {
    inputId = element.id;
    targetState = document.getElementById(inputId).dataset.state;
    targetElement = document.getElementById(inputId).dataset.element;

    changeColor();
  });
});

const themeElement = document.getElementById("themes");

themeElement.addEventListener("change", () => load.selectedTheme(themeElement, getAllInputColor));
