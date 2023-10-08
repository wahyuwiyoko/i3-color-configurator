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

export default function updateCode(inputColor) {
  updatei3Code(inputColor);
  updatei3statusCode(inputColor);
}
