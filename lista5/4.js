import fs from "fs";

fs.readFile("4.txt", { encoding: "utf8" }, (err, data) => {
  const lines = data.split("\n").forEach((line) => {
    console.log(line);
  });
});
