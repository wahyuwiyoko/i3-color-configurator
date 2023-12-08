export default function copyCode(buttonId, elementId) {
  const copyButton = document.getElementById(buttonId);
  const codeBlock = document.getElementById(elementId);

  const codeToCopy = codeBlock.innerText;
  navigator.clipboard.writeText(codeToCopy);

  copyButton.innerHTML = "Copied!";

  setTimeout(() => {
    copyButton.innerHTML = "Copy Code";
  }, 3000);
}
