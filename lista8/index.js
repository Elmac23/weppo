import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import cookieParser from "cookie-parser";
import FileStoreSession from "session-file-store";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FileStore = FileStoreSession(session);
const app = express();

// Konfiguracja multer do przesyłania plików
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Konfiguracja sesji z file store
app.use(
  session({
    store: new FileStore({
      path: "./sessions",
    }),
    secret: "moj-tajny-klucz-sesji",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // 24 godziny
  })
);

// Konfiguracja widoków EJS i layoutów
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layout"); // domyślny layout

// Middleware do sprawdzania obsługi cookies
app.use((req, res, next) => {
  // Sprawdzamy czy przeglądarka obsługuje cookies
  if (!req.cookies.cookieTest) {
    res.cookie("cookieTest", "test", { maxAge: 900000 });
    req.cookiesSupported = false;
  } else {
    req.cookiesSupported = true;
  }
  next();
});

// Strona główna - menu z wszystkimi funkcjami
app.get("/", (req, res) => {
  res.render("index", {
    title: "Lista 8 - Wszystkie funkcje",
    cookiesSupported: req.cookiesSupported,
    sessionData: req.session,
  });
});

// 1. PRZESYŁANIE PLIKÓW
app.get("/upload", (req, res) => {
  res.render("upload", { title: "Przesyłanie plików" });
});

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.render("upload", {
      title: "Przesyłanie plików",
      error: "Nie wybrano pliku!",
    });
  }

  res.render("upload", {
    title: "Przesyłanie plików",
    success: `Plik ${req.file.originalname} został przesłany pomyślnie!`,
    fileInfo: {
      originalName: req.file.originalname,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
    },
  });
});

// 2. LAYOUTY - przykład różnych layoutów
app.get("/layout-demo", (req, res) => {
  res.render("layout-demo", {
    title: "Demo layoutów",
    layout: "admin-layout", // używamy innego layoutu
  });
});

// 3. PARAMETRY DO WIDOKÓW INCLUDE - formularze radio i checkbox
app.get("/forms", (req, res) => {
  const radioOptions = [
    { value: "red", label: "Czerwony", name: "color" },
    { value: "green", label: "Zielony", name: "color" },
    { value: "blue", label: "Niebieski", name: "color" },
  ];

  const checkboxOptions = [
    { value: "html", label: "HTML", name: "skills" },
    { value: "css", label: "CSS", name: "skills" },
    { value: "javascript", label: "JavaScript", name: "skills" },
    { value: "nodejs", label: "Node.js", name: "skills" },
  ];

  res.render("forms", {
    title: "Formularze z parametrami",
    radioOptions,
    checkboxOptions,
    selectedColor: req.query.color,
    selectedSkills: Array.isArray(req.query.skills)
      ? req.query.skills
      : [req.query.skills].filter(Boolean),
  });
});

app.post("/forms", (req, res) => {
  res.redirect(
    `/forms?color=${req.body.color || ""}&skills=${
      Array.isArray(req.body.skills)
        ? req.body.skills.join("&skills=")
        : req.body.skills || ""
    }`
  );
});

// 4. DOWNLOAD PLIKU - Content-Disposition attachment
app.get("/download", (req, res) => {
  res.render("download", { title: "Download plików" });
});

app.get("/download/csv", (req, res) => {
  const csvData = `Imię,Nazwisko,Wiek,Email
Jan,Kowalski,30,jan@example.com
Anna,Nowak,25,anna@example.com
Piotr,Wiśniewski,35,piotr@example.com`;

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="dane.csv"');
  res.send(csvData);
});

app.get("/download/json", (req, res) => {
  const jsonData = {
    users: [
      { id: 1, name: "Jan Kowalski", email: "jan@example.com" },
      { id: 2, name: "Anna Nowak", email: "anna@example.com" },
      { id: 3, name: "Piotr Wiśniewski", email: "piotr@example.com" },
    ],
    generated: new Date().toISOString(),
  };

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Content-Disposition", 'attachment; filename="users.json"');
  res.send(JSON.stringify(jsonData, null, 2));
});

// 5. COOKIES
app.get("/cookies", (req, res) => {
  res.render("cookies", {
    title: "Zarządzanie Cookies",
    cookies: req.cookies,
    cookiesSupported: req.cookiesSupported,
  });
});

app.post("/cookies/set", (req, res) => {
  const { name, value, maxAge } = req.body;
  const options = {};
  if (maxAge) {
    options.maxAge = parseInt(maxAge) * 1000; // konwersja na milisekundy
  }
  res.cookie(name, value, options);
  res.redirect("/cookies");
});

app.post("/cookies/delete", (req, res) => {
  const { name } = req.body;
  res.clearCookie(name);
  res.redirect("/cookies");
});

app.get("/cookies/test", (req, res) => {
  // Test sprawdzający czy przeglądarka obsługuje cookies
  if (req.cookies.testCookie) {
    res.json({
      cookiesSupported: true,
      message: "Przeglądarka obsługuje cookies",
      testCookie: req.cookies.testCookie,
    });
  } else {
    res.cookie("testCookie", "test-value-" + Date.now());
    res.json({
      cookiesSupported: false,
      message: "Cookie ustawione, odśwież stronę żeby sprawdzić obsługę",
    });
  }
});

// 6. SESJE
app.get("/sessions", (req, res) => {
  res.render("sessions", {
    title: "Zarządzanie Sesjami",
    sessionData: req.session,
    sessionId: req.sessionID,
  });
});

app.post("/sessions/set", (req, res) => {
  const { key, value } = req.body;
  if (!req.session.customData) {
    req.session.customData = {};
  }
  req.session.customData[key] = value;
  res.redirect("/sessions");
});

app.post("/sessions/delete", (req, res) => {
  const { key } = req.body;
  if (req.session.customData && req.session.customData[key]) {
    delete req.session.customData[key];
  }
  res.redirect("/sessions");
});

app.post("/sessions/destroy", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/sessions");
    }
    res.clearCookie("connect.sid"); // domyślna nazwa cookie sesji
    res.redirect("/sessions");
  });
});

// Counter w sesji - demonstracja
app.get("/sessions/counter", (req, res) => {
  if (!req.session.visitCount) {
    req.session.visitCount = 1;
  } else {
    req.session.visitCount++;
  }

  res.json({
    visitCount: req.session.visitCount,
    sessionId: req.sessionID,
    message: `To jest twoja ${req.session.visitCount}. wizyta na tej stronie`,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
  console.log(`Otwórz http://localhost:${PORT} w przeglądarce`);
});
