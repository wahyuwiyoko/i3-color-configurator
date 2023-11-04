async function importTheme(path) {
  const getTheme = await fetch(path);
  const json = await getTheme.json();

  return json;
}

const defaultTheme = await importTheme("./assets/themes/default.json");

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

export { importTheme, defaultTheme, getFormattedJson as formatted };
