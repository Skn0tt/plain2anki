import {
  parsePlainTextCard,
  serializeCardsAsCSV,
} from "./plain2anki";

describe("parsePlainTextCard", () => {
  it("splits at the last question mark", () => {
    expect(parsePlainTextCard("Question1?Question2?  Answer")).toEqual({
      question: "Question1?Question2?",
      answer: "Answer"
    })
  })

  describe("when not containing a question mark", () => {
    it("splits at the first stop", () => {
      expect(parsePlainTextCard("DefineA.AnswerA")).toEqual({
        question: "DefineA.",
        answer: "AnswerA"
      })
    })
  })
})

describe("serializeCardsAsCSV", () => {
  it("joins all into a csv", () => {
    expect(serializeCardsAsCSV([
      {
        question: "Q1",
        answer: "A1"
      },
      {
        question: "Q2",
        answer: "A2"
      }
    ])).toBe('"Q1";"A1"\n"Q2";"A2"')
  })
})
