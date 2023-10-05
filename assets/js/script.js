let colorPicker, inputId, targetState, targetElement;

async function importTheme(path) {
  const getTheme = await fetch(path)
  const json = await getTheme.json();

  return json;
}

const theme = await importTheme("./assets/themes/default.json");

// Load the startup() after page finish loaded
window.addEventListener("load", startup());

function startup() {
  let color = {};

  // Format the JSON to ID of input color
  for (const [key, value] of Object.entries(theme)) {
    for (const [state, stateValue] of Object.entries(value)) {
      for (const [element, elementValue] of Object.entries(stateValue)) {
        color[`${key}-${state}-${element}`] = elementValue;
      }
    }
  }

  loadStartupColor(color);
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
client.background               ${color["title-window-bg"]}

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
