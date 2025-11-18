import fs from "fs";
import readline from "readline";

const fileStream = fs.createReadStream("6.txt");

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

const ipMap = new Map();

rl.on("line", (line) => {
  const ip = line.split(" ")[1];
  if (ipMap.has(ip)) {
    ipMap.set(ip, ipMap.get(ip) + 1);
  } else {
    ipMap.set(ip, 1);
  }
});

rl.on("close", () => {
  const top3 = Array.from(ipMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  top3.forEach(([ip, count]) => {
    console.log(`${ip}: ${count}`);
  });
});
