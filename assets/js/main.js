import updateCode from "./code.js";
import * as theme from "./theme.js";
import updateElementColor from "./element-color-update.js";

let colorPicker, inputId, targetState, targetElement;

// Load the startup() after page finish loaded
window.addEventListener("load", startup());

function startup() {
  loadColor(theme.formatted(theme.defaultTheme));
  updateCode(getAllInputColor());
}

function loadColor(color) {
  for (const input of document.getElementsByTagName("input")) {
    // Change every color picker value
    input.value = color[input.id];

    updateElementColor(input.value, input.dataset.state, input.dataset.element);
  }
}

function getAllInputColor() {
  let inputTags = {};

  for (const inputTag of document.querySelectorAll("input")) {
    if (inputTag.id) {
      inputTags[inputTag.id] = inputTag.value;
    }
  }

  return inputTags;
}

function changeColor() {
  colorPicker = document.getElementById(inputId);
  colorPicker.addEventListener("change", updateElementColor(colorPicker.value, targetState, targetElement));
  colorPicker.addEventListener("change", updateCode(getAllInputColor()));
}

document.querySelectorAll("input[type=color]").forEach((element) => {
  element.addEventListener("change", () => {
    inputId = element.id;
    targetState = document.getElementById(element.id).dataset.state;
    targetElement = document.getElementById(element.id).dataset.element;

    changeColor();
  });
});

const themeElement = document.getElementById("themes");

async function setSelectedTheme() {
  const selectedTheme = await theme.importTheme(`./assets/themes/${themeElement.value}.json`);
  loadColor(theme.formatted(selectedTheme));
  updateCode(getAllInputColor());
}

themeElement.addEventListener("change", setSelectedTheme);
