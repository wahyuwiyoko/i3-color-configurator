export default function updateElementColor(color, state, element) {
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
