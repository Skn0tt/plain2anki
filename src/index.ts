import { plain2anki, ParsingMode } from "./plain2anki";

const downloadbutton = document.getElementById("downloadbutton") as HTMLButtonElement;
const plaininput = document.getElementById("plaininput") as HTMLTextAreaElement;
const parsingModeSelect = document.getElementById("parsing-mode") as HTMLSelectElement;

function getParsingMode() {
  return parsingModeSelect.value as ParsingMode;
}

const placeholders: Record<ParsingMode, string> = {
  default: "- How many ounces is one kilo? 2.37 ounces.\n...",
  "dash-separator": "How many ounces is one Kilo?\n2.37 ounces\n-   \nHow many Shrimps to you have to eat before your skin turns pink?\nAll of them.\n\n..."
}

function onChangeParsingMode() {
  const mode = getParsingMode();
  plaininput.placeholder = placeholders[mode];
  console.log(plaininput.placeholder)
}

parsingModeSelect.onchange = onChangeParsingMode;
onChangeParsingMode();

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
  