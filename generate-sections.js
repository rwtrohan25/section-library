const fs = require("fs");
const path = require("path");

const USERNAME = "rwtrohan25";
const REPO = "section-library";
const BRANCH = "main";

let sections = [];
let id = 1;

function scanFolder(folder) {
  const items = fs.readdirSync(folder);

  for (const item of items) {
    const fullPath = path.join(folder, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanFolder(fullPath);
      continue;
    }

    if (!/\.(jpg|jpeg|png|webp)$/i.test(item)) continue;

    const folderName = path.dirname(fullPath).replace(/\\/g, "/");

    sections.push({
      id: id++,
      title: path.parse(item).name,
      category: folderName.split("/")[0],
      image:
        `https://raw.githubusercontent.com/${USERNAME}/${REPO}/${BRANCH}/` +
        folderName.split("/").map(encodeURIComponent).join("/") +
        "/" +
        encodeURIComponent(item)
    });
  }
}

const folders = fs.readdirSync(".").filter((item) => {
  if (item.startsWith(".")) return false;
  if (item === "node_modules") return false;
  return fs.statSync(item).isDirectory();
});

folders.sort();

for (const folder of folders) {
  scanFolder(folder);
}

sections.sort((a, b) => {
  if (a.category === b.category) {
    return a.title.localeCompare(b.title);
  }
  return a.category.localeCompare(b.category);
});

sections.forEach((item, index) => {
  item.id = index + 1;
});

fs.writeFileSync(
  "sections.json",
  JSON.stringify({ sections }, null, 2)
);

console.log(`${sections.length} sections generated.`);
