// const fs = require("fs");
// const http = require("http");

// const server = http.createServer((req, res) => {
//   console.log(req.url);
//   if (req.url === "/peliculas") {
//     fs.readFile("./data/movies.json", "utf-8", (err, data) => {
//       res.end(data);
//     });
//   } else if (req.url === "/series") {
//     fs.readFile("./data/series.json", "utf-8", (err, data) => {
//       res.end(data);
//     });
//   } else {
//     res.writeHead(404, {
//       "Content-type": "text/html",
//     });
//     res.end("<h1>Estás en la página equivocada.</h1>");
//   }
// });

// server.listen(8080);

// filesystem
const fs = require("fs");
const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  console.log(url.parse(req.url, true));
  console.log("hola chicas");
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/peliculas") {
    if (query.id === "1") {
      fs.readFile("./data/singleMovie.json", "utf-8", (err, data) => {
        res.end(data);
      });
    }
    fs.readFile("./data/movies.json", "utf-8", (err, data) => {
      res.end(data);
    });
  } else if (pathname === "/series") {
    fs.readFile("./data/series.json", "utf-8", (err, data) => {
      res.end(data);
    });
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end(`
    <div>
      <img src="http://www.placekitten.com/300">
      <p>Estas en la pagina equivocada.</p>
    </div>
    `);
  }
});

server.listen(8080);
