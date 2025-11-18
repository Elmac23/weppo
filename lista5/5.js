import http from "http";
import { URL } from "url";

function fetchUrl(urlString) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlString);

    const req = http.get(urlString, (res) => {
      if (
        res.statusCode >= 300 &&
        res.statusCode < 400 &&
        res.headers.location
      ) {
        const next = new URL(res.headers.location, url).toString();
        res.resume();
        return resolve(fetchUrl(next));
      }

      if (res.statusCode < 200 || res.statusCode >= 400) {
        const err = new Error(`Request Failed. Status Code: ${res.statusCode}`);
        res.resume();
        return reject(err);
      }

      res.setEncoding("utf8");
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => resolve(body));
    });

    req.on("error", (err) => reject(err));
  });
}

fetchUrl("http://www.example.com")
  .then((body) => {
    console.log(body);
  })
  .catch((err) => {
    console.error("Error fetching URL:", err);
  });
