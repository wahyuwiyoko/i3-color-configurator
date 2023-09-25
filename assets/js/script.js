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

function changeColor() {
  colorPicker = document.querySelector(`#${inputId}`);
  colorPicker.addEventListener("change", updateColor(colorPicker.value, targetState, targetElement));
}

function getId(id, state, element) {
  inputId = id;
  targetState = state;
  targetElement = element;

  changeColor();
}
