# github-lang-css

dynamically generated css package for github language colors, updated every time when `npm run build` is executed.

## usage

because github language names aren't compatable with css, some replacement must be done:

```js

const digitToWord = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const langFromGithub = "...";

const cssClass = langFromGithub
    .replace("+", "p")
    .replace("#", "-Sharp")
    .replace(/\s/g, "-")
    .replace(".", "-")
    .replace(/["'()]/g, "")
    .replace(/^\d/, (match) => digitToWord[match]);

```
