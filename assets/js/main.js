import updateCode from "./code.js";

let colorPicker, inputId, targetState, targetElement;

async function importTheme(path) {
  const getTheme = await fetch(path)
  const json = await getTheme.json();

  return json;
}

const defaultTheme = await importTheme("./assets/themes/default.json");

// Load the startup() after page finish loaded
window.addEventListener("load", startup());

function startup() {
  loadColor(getFormattedJson(defaultTheme));
  updateCode(getAllInputColor());
}

function getFormattedJson(theme) {
  let color = {};

  // Format the JSON to ID of input color
  for (const [key, value] of Object.entries(theme)) {
    for (const [state, stateValue] of Object.entries(value)) {
      for (const [element, elementValue] of Object.entries(stateValue)) {
        color[`${key}-${state}-${element}`] = elementValue;
      }
    }
  }

  return color;
}

function loadColor(color) {
  for (const input of document.getElementsByTagName("input")) {
    // Change every color picker value
    input.value = color[input.id];

    updateColor(input.value, input.dataset.state, input.dataset.element);
  }
}

function updateColor(color, state, element) {
  const elementState = document.getElementById(state);

  switch (element) {
    case "border":
      elementState.style.borderColor = color;
      break;
    case "bg":
      if (state === "window") {
        document.querySelectorAll("#window").forEach((window) => {
          window.style.backgroundColor = color;
        });
        break;
      }

      if (state === "dmenu-item") {
        document.querySelectorAll("#dmenu-item").forEach((item) => {
          item.style.backgroundColor = color;
        });
        break;
      }

      elementState.style.backgroundColor = color;
      break;
    case "text":
      if (state === "dmenu-item") {
        document.querySelectorAll("#dmenu-item").forEach((item) => {
          item.style.color = color;
        });
        break;
      }

      elementState.style.color = color;
      break;
    case "indicator":
      updateWindowColor(state).style.borderBottomColor = color;
      break;
    case "child-border":
      updateWindowColor(state).style.borderRightColor = color;
      updateWindowColor(state).style.borderLeftColor = color;
      break;
    case "separator":
      document.querySelectorAll("#bar-separator").forEach((bar) => {
        bar.style.color = color;
      });
      break;
    default:
      break;
  }
}

function updateWindowColor(state) {
  const windows = document.querySelectorAll("#window");

  switch (state) {
    case "focused-window":
      return windows[0];
    case "inactive-window":
      return windows[1];
    case "unfocused-window":
      return windows[2];
    case "urgent-window":
      return windows[3];
    case "placeholder-window":
      return windows[4];
    default:
      break;
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
  colorPicker.addEventListener("change", updateColor(colorPicker.value, targetState, targetElement));
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
  const selectedTheme = await importTheme(`./assets/themes/${themeElement.value}.json`);
  loadColor(getFormattedJson(selectedTheme));
  updateCode(getAllInputColor());
}

themeElement.addEventListener("change", setSelectedTheme);
