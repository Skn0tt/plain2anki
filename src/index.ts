import { plain2anki } from "./plain2anki";

const downloadbutton = document.getElementById("downloadbutton") as HTMLButtonElement;
const plaininput = document.getElementById("plaininput") as HTMLTextAreaElement;

function downloadFile(contents: string, filename: string) {
  const blob = new Blob([contents]);
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  // document.body.appendChild(link);
  link.click();
}

downloadbutton.onclick = function onClickDownload() {
  const plaintext = plaininput.value;
  const csv = plain2anki(plaintext);
  downloadFile(csv, "cards.csv");
}
  