type PlainTextFile = string;
type PlainTextCard = string;
type Card = {
  question: string;
  answer: string;
}
type AnkiCSV = string;

export type ParsingMode = "default" | "dash-separator";

function splitFileToCardsDashSeparatorMode(file: PlainTextFile): PlainTextCard[] {
  return file.split(/^\s*-+\s*$/gm).map(f => f.trim()).filter(v => !!v);
}

export function splitFileToCardsDefaultMode(file: PlainTextFile): PlainTextCard[] {
  return file.split("\n").map(f => f.trim()).filter(v => !!v).map(l => {
    if (["-", "*", "+"].includes(l[0])) {
      return l.substring(1).trim();
    }
    return l;
  });
}

export function splitFileToCards(file: PlainTextFile, mode: ParsingMode): PlainTextCard[] {
  switch (mode) {
    case "dash-separator":
      return splitFileToCardsDashSeparatorMode(file);
    case "default":
      return splitFileToCardsDefaultMode(file);
  }
}

export function parsePlainTextCard(card: PlainTextCard): Card {
  const indexOfLastQuestionMark = card.lastIndexOf("?");
  const indexOfFirstStop = card.indexOf(".");
  const splitIndex = indexOfLastQuestionMark === -1 ? indexOfFirstStop : indexOfLastQuestionMark;

  const question = card.substring(0, splitIndex + 1);
  const answer = card.substring(splitIndex + 1);

  return {
    question: question.trim(),
    answer: answer.trim()
  }
}

export function parsePlainTextCards(cards: PlainTextCard[]): Card[] {
  return cards.map(parsePlainTextCard);
}

export function serializeCardsAsCSV(cards: Card[]): AnkiCSV {
  return cards.map(c => `"${c.question}";"${c.answer}"`).join("\n");
}

export function plain2anki(plain: PlainTextFile, mode: ParsingMode): AnkiCSV {
  const plainTextCards = splitFileToCards(plain, mode);
  const cards = parsePlainTextCards(plainTextCards);
  const csv = serializeCardsAsCSV(cards);
  return csv;
}