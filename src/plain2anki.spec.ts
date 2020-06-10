import { parsePlainTextCard, serializeCardsAsCSV, splitFileToCards, parsePlainTextCards } from "./plain2anki";

describe("parsePlainTextCard", () => {
  it("splits at the last question mark", () => {
    expect(parsePlainTextCard("Question1?Question2?  Answer")).toEqual({
      question: "Question1?Question2?",
      answer: "Answer",
    });
  });

  describe("when passed a card containing line breaks", () => {
    it("preserves them", () => {
      expect(parsePlainTextCard("Question1?\nAnswer1\nAnswer2")).toEqual({
        question: "Question1?",
        answer: "Answer1\nAnswer2"
      })
    })
  })

  describe("when not containing a question mark", () => {
    it("splits at the first stop", () => {
      expect(parsePlainTextCard("DefineA.AnswerA")).toEqual({
        question: "DefineA.",
        answer: "AnswerA",
      });
    });
  });
});

describe("splitFileToCards", () => {
  describe("in dash-separator-mode", () => {
    it("splits at dashes in otherwise blank lines", () => {
      expect(
        splitFileToCards("Question1?\nAnswer1\n Answer1.1\n  ---  \nQuestion2?\nAnswer2", "dash-separator")
      ).toEqual(["Question1?\nAnswer1\n Answer1.1", "Question2?\nAnswer2"]);
    });
  });
});

describe("serializeCardsAsCSV", () => {
  it("joins all into a csv", () => {
    expect(
      serializeCardsAsCSV([
        {
          question: "Q1",
          answer: "A1",
        },
        {
          question: "Q2",
          answer: "A2",
        },
      ])
    ).toBe('"Q1";"A1"\n"Q2";"A2"');
  });
});
