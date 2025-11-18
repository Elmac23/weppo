import fs from "fs";
import { promisify } from "util";

fs.readFile("4.txt", { encoding: "utf8" }, (err, data) => {
  const lines = data.split("\n");
  lines.forEach((line) => {
    console.log(line);
  });
});
function readFilePromise(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: "utf8" }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

const readFileAsync = promisify(fs.readFile);

fs.promises.readFile("4.txt", { encoding: "utf8" }).then((data) => {
  data.split("\n").forEach((line) => {
    console.log(line);
  });
});

async function main() {
  const data = await readFilePromise("4.txt");
  data.split("\n").forEach((line) => {
    console.log(line);
  });
}

main();
