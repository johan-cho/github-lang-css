const fs = require("node:fs");
const yaml = require("js-yaml");
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

/**
 * reads from github's linguist and creates a css file with the colors of the languages
 */
async function main() {
  const resp = await fetch(
    "https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml"
  );
  if (!resp.ok) throw new Error("Failed to fetch languages.yml");
  const langs = yaml.load(await resp.text());

  const langColors = Object.keys(langs).reduce((acc, val) => {
    acc[
      val
        .replace("+", "p")
        .replace("#", "-Sharp")
        .replace(/\s/g, "-")
        .replace(".", "-")
        .replace(/["'()]/g, "")
        .replace(/^\d/, (match) => digitToWord[match])
    ] = langs[val].color;
    return acc;
  }, {});

  const payloadArry = Object.entries(langColors).filter(([_, val]) =>
    Boolean(val)
  );
  fs.writeFileSync(
    "index.css",
    payloadArry.map(([key, val]) => `.${key}{color: ${val};}`).join("")
  );
  fs.writeFileSync(
    "background.css",
    payloadArry
      .map(([key, val]) => `.${key}-bg{background-color: ${val};}`)
      .join("")
  );
  fs.writeFileSync("langs.json", JSON.stringify(langColors));
}

main();
