type PlainTextFile = string;
type PlainTextCard = string;
type Card = {
  question: string;
  answer: string;
}
type AnkiCSV = string;

export function splitFileToCards(file: PlainTextFile): PlainTextCard[] {
  return file.split("\n").map(f => f.trim()).filter(v => !!v).map(l => {
    if (["-", "*", "+"].includes(l[0])) {
      return l.substring(1).trim();
    }
    return l;
  });
}

export function parsePlainTextCard(card: PlainTextCard): Card {
  const indexOfLastQuestionMark = card.lastIndexOf("?");
  const question = card.substring(0, indexOfLastQuestionMark + 1);
  const answer = card.substring(indexOfLastQuestionMark + 1);

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

export function plain2anki(plain: PlainTextFile): AnkiCSV {
  const plainTextCards = splitFileToCards(plain);
  const cards = parsePlainTextCards(plainTextCards);
  const csv = serializeCardsAsCSV(cards);
  return csv;
}