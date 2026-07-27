const fs = require("fs");
const path = require("path");

const REPO = "rwtrohan25";
const BRANCH = "main";

let sections = [];
let id = 1;

// Repository ke root ke saare folders padho
const folders = fs
  .readdirSync(".")
  .filter((folder) => {
    if (!fs.statSync(folder).isDirectory()) return false;

    // Hidden folders ignore karo
    if (folder.startsWith(".")) return false;

    // node_modules ignore
    if (folder === "node_modules") return false;

    return true;
  });

for (const folder of folders) {

  const files = fs
    .readdirSync(folder)
    .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .sort();

  for (const file of files) {

    sections.push({
      id: id++,
      title: path.parse(file).name,
      category: folder,
      image:
        `https://raw.githubusercontent.com/${REPO}/section-library/${BRANCH}/` +
        `${encodeURIComponent(folder)}/${encodeURIComponent(file)}`
    });

  }

}

fs.writeFileSync(
  "sections.json",
  JSON.stringify({ sections }, null, 2)
);

console.log(`Generated ${sections.length} sections.`);
