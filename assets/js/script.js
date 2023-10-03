/*
  References:
  https://developer.mozilla.org/docs/Web/HTML/Element/Input/color
  https://developer.mozilla.org/docs/Web/API/HTMLElement/change_event
  https://developer.mozilla.org/docs/Web/API/Window/load_event
*/

let colorPicker, inputId, targetState, targetElement;

// Load the startup() after page finish loaded
window.addEventListener("load", startup());

function startup() {
  loadStartupColor(getDefaultColors());
  updateCode();
}

function loadStartupColor(color) {
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

function updateCode() {
  updatei3Code(getAllInputColor());
  updatei3statusCode(getAllInputColor());
}

function updatei3Code(color) {
  const i3Code = `
# Class                 Border  Bground Text    Indicator Child_border
client.focused          ${color["title-focused-border"]} ${color["title-focused-bg"]} ${color["title-focused-text"]} ${color["title-focused-indicator"]}   ${color["title-focused-child-border"]}
client.focused_inactive ${color["title-inactive-border"]} ${color["title-inactive-bg"]} ${color["title-inactive-text"]} ${color["title-inactive-indicator"]}   ${color["title-inactive-child-border"]}
client.unfocused        ${color["title-unfocused-border"]} ${color["title-unfocused-bg"]} ${color["title-unfocused-text"]} ${color["title-unfocused-indicator"]}   ${color["title-unfocused-child-border"]}
client.urgent           ${color["title-urgent-border"]} ${color["title-urgent-bg"]} ${color["title-urgent-text"]} ${color["title-urgent-indicator"]}   ${color["title-urgent-child-border"]}
client.placeholder      ${color["title-placeholder-border"]} ${color["title-placeholder-bg"]} ${color["title-placeholder-text"]} ${color["title-placeholder-indicator"]}   ${color["title-placeholder-child-border"]}
client.background               ${color["title-window"]}

bar {
  colors {
    background ${color["status-basic-bg"]}
    statusline ${color["status-basic-text"]}
    separator  ${color["status-basic-separator"]}

    # Class            Border  Bground Text
    focused_workspace  ${color["workspace-focused-border"]} ${color["workspace-focused-bg"]} ${color["workspace-focused-text"]}
    active_workspace   ${color["workspace-active-border"]} ${color["workspace-active-bg"]} ${color["workspace-active-text"]}
    inactive_workspace ${color["workspace-inactive-border"]} ${color["workspace-inactive-bg"]} ${color["workspace-inactive-text"]}
    urgent_workspace   ${color["workspace-urgent-border"]} ${color["workspace-urgent-bg"]} ${color["workspace-urgent-text"]}
    binding_mode       ${color["workspace-binding-border"]} ${color["workspace-binding-bg"]} ${color["workspace-binding-text"]}
  }
}

bindsym $mod+d exec --no-startup-id dmenu_run -nf "${color["dmenu-normal-text"]}" -nb "${color["dmenu-normal-bg"]}" -sb "${color["dmenu-selected-bg"]}" -sf "${color["dmenu-selected-text"]}" -fn "monospace:size=10" -p "dmenu"
`;

  document.getElementById("i3-config-code").textContent = i3Code;
}

function updatei3statusCode(color) {
  const i3status = `
general {
  output_format = "i3bar"
  colors = true
  color_good = "${color["status-good-text"]}"
  color_degraded = "${color["status-degraded-text"]}"
  color_bad = "${color["status-bad-text"]}"
}
`;

  document.getElementById("i3status-code").textContent = i3status;
}

function changeColor() {
  colorPicker = document.getElementById(inputId);
  colorPicker.addEventListener("change", updateColor(colorPicker.value, targetState, targetElement));
  colorPicker.addEventListener("change", updateCode());
}

document.querySelectorAll("input[type=color]").forEach((element) => {
  element.addEventListener("change", () => {
    inputId = element.id;
    targetState = document.getElementById(element.id).dataset.state;
    targetElement = document.getElementById(element.id).dataset.element;

    changeColor();
  });
});

function getDefaultColors() {
  return {
    "dmenu-normal-bg": "#222222",
    "dmenu-normal-text": "#bbbbbb",
    "dmenu-selected-bg": "#005577",
    "dmenu-selected-text": "#eeeeee",
    "status-bad-text": "#ff0000",
    "status-basic-bg": "#000000",
    "status-basic-separator": "#666666",
    "status-basic-text": "#ffffff",
    "status-degraded-text": "#ffff00",
    "status-good-text": "#00ff00",
    "title-focused-bg": "#285577",
    "title-focused-border": "#4c7899",
    "title-focused-child-border": "#285577",
    "title-focused-indicator": "#2e9ef4",
    "title-focused-text": "#ffffff",
    "title-inactive-bg": "#5f676a",
    "title-inactive-border": "#333333",
    "title-inactive-child-border": "#5f676a",
    "title-inactive-indicator": "#484e50",
    "title-inactive-text": "#ffffff",
    "title-placeholder-bg": "#0c0c0c",
    "title-placeholder-border": "#000000",
    "title-placeholder-child-border": "#0c0c0c",
    "title-placeholder-indicator": "#000000",
    "title-placeholder-text": "#ffffff",
    "title-unfocused-bg": "#222222",
    "title-unfocused-border": "#333333",
    "title-unfocused-child-border": "#222222",
    "title-unfocused-indicator": "#292d2e",
    "title-unfocused-text": "#888888",
    "title-urgent-bg": "#900000",
    "title-urgent-border": "#2f343a",
    "title-urgent-child-border": "#900000",
    "title-urgent-indicator": "#900000",
    "title-urgent-text": "#ffffff",
    "title-window": "#ffffff",
    "workspace-active-bg": "#222222",
    "workspace-active-border": "#333333",
    "workspace-active-text": "#ffffff",
    "workspace-binding-bg": "#900000",
    "workspace-binding-border": "#2f343a",
    "workspace-binding-text": "#ffffff",
    "workspace-focused-bg": "#285577",
    "workspace-focused-border": "#4c7899",
    "workspace-focused-text": "#ffffff",
    "workspace-inactive-bg": "#222222",
    "workspace-inactive-border": "#333333",
    "workspace-inactive-text": "#888888",
    "workspace-urgent-bg": "#900000",
    "workspace-urgent-border": "#2f343a",
    "workspace-urgent-text": "#ffffff"
  };
}
