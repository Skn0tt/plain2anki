# plain2anki

plain2anki allows you to take plain text notes on your lectures and classes and then automatically converting them to a Anki-importable CSV.

## Getting Started

Go to [plain2anki.simonknott.de](https://plain2anki.simonknott.de), enter your plain text notes and click on the "download" button to obtain a CSV file of your questions.
That file can then be imported in Anki: The first column contains the questions, the second one contains answers.

The parsing rules for your plain text notes are illustrated by the following example:

```
- How many ounces is one kilo? 2.37 ounces.
* What's 1+1? Is it odd? It's two, it's even.

What's the stupidest animal in the jungle?    The polar bear.
```

This will result in the following questions:

Q: How many ounces is one kilo?
A: 2.37 ounces.

Q: What's 1+1? Is it Odd?
A: It's two, it's even.

Q: What's the stupidest animal in the jungle?
A: The polar bear.

Some rules for parsing your plain text:

- Cards are separated by line breaks.
- Empty lines are ignored.
- Leading enumeration marks like `-`, `*`, or `+` are ignored.
- The last question mark in a line marks the end of the question.
- If there's no question mark, e.g. in a "Define X." kind of card, the first "." marks the end of the question.
- Both questions and answers are trimmed of surrounding whitespace.

## Contributing

I'd like to invite all of you to contribute.
Open up an issue, fork and PR, spread the word.
Any kind of contribution is appreciated 🎉
