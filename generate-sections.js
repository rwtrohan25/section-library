const fs = require("fs");
const path = require("path");

const repo = ".";

const folders = [
  { name: "Hero", category: "Hero" },
  { name: "About us", category: "About us" },
  { name: "Reviews", category: "Reviews" },
];

let id = 1;
let sections = [];

folders.forEach((folder) => {
  const folderPath = path.join(repo, folder.name);

  if (!fs.existsSync(folderPath)) return;

  const files = fs
    .readdirSync(folderPath)
    .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file));

  files.forEach((file) => {
    sections.push({
      id: id++,
      title: path.parse(file).name,
      category: folder.category,
      image: `https://raw.githubusercontent.com/rwtrohan25/section-library/main/${encodeURIComponent(folder.name)}/${encodeURIComponent(file)}`
    });
  });
});

fs.writeFileSync(
  "sections.json",
  JSON.stringify({ sections }, null, 2)
);

console.log("sections.json updated!");
