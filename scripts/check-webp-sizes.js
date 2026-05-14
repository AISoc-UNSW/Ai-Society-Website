const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const searchRoots = [
  path.join(projectRoot, "src", "assets"),
  path.join(projectRoot, "public")
];
const maxSizeBytes = 200 * 1024;
const offenders = [];

for (const root of searchRoots) {
  walk(root);
}

if (offenders.length === 0) {
  console.log("All tracked WebP assets are within the 200 KB target.");
  process.exit(0);
}

console.error("Found oversized WebP assets:");
offenders
  .sort((a, b) => b.size - a.size)
  .forEach((entry) => {
    const relativePath = path.relative(projectRoot, entry.filePath);
    const sizeInKb = (entry.size / 1024).toFixed(1);
    console.error(`- ${relativePath} (${sizeInKb} KB)`);
  });

process.exit(1);

function walk(targetPath) {
  if (!fs.existsSync(targetPath)) {
    return;
  }

  const stat = fs.statSync(targetPath);

  if (stat.isDirectory()) {
    fs.readdirSync(targetPath).forEach((childName) => {
      walk(path.join(targetPath, childName));
    });
    return;
  }

  if (path.extname(targetPath).toLowerCase() !== ".webp") {
    return;
  }

  if (stat.size > maxSizeBytes) {
    offenders.push({
      filePath: targetPath,
      size: stat.size
    });
  }
}
