/*
  References:
  https://developer.mozilla.org/docs/Web/HTML/Element/Input/color
  https://developer.mozilla.org/docs/Web/API/HTMLElement/change_event
*/

let colorPicker, inputId, targetState, targetElement;

function updateColor(color, state, element) {
  const elementState = document.querySelector(`#${state}`);

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

      elementState.style.backgroundColor = color;
      break;
    case "text":
      elementState.style.color = color;
      break;
    case "indicator":
      updateWindowColor(state).style.borderBottomColor = color;
      break;
    case "child-border":
      updateWindowColor(state).style.borderRightColor = color;
      updateWindowColor(state).style.borderLeftColor = color;
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

function updateCode() {
  const hexColor = getAllInputColor();

  const i3Code = `
# Class                 Border  Bground Text    Indicator Child_border
client.focused          ${hexColor["title-focused-border"]} ${hexColor["title-focused-bg"]} ${hexColor["title-focused-text"]} ${hexColor["title-focused-indicator"]}   ${hexColor["title-focused-child-border"]}
client.focused_inactive
client.unfocused
client.urgent
client.placeholder
client.background

bar {
  colors {
    background
    statusline
    separator

    # Class            Border  Bground  Text
    focused_workspace
    active_workspace
    inactive_workspace
    urgent_workspace
    binding_mode
  }
}
`;

  document.getElementById("i3-config-code").textContent = i3Code;
}

function changeColor() {
  colorPicker = document.querySelector(`#${inputId}`);
  colorPicker.addEventListener("change", updateColor(colorPicker.value, targetState, targetElement));
  colorPicker.addEventListener("change", updateCode());
}

function getId(id, state, element) {
  inputId = id;
  targetState = state;
  targetElement = element;

  changeColor();
}
