import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import https from "https";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/print", (req, res) => {
  res.sendFile(path.join(__dirname, "print.html"));
});

const httpsServer = https.createServer(
  {
    passphrase: "zaq1",
    pfx: fs.readFileSync(path.resolve(__dirname, "cert.pfx")),
  },
  app
);

httpsServer.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
