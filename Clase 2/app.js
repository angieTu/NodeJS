// const express = require("express");
// const app = express();
// const port = 8080;

// app.get("/", (req, res) => {
//   res.send("Hola desde Express!");
// });

// app.get("/", (req, res) => {
//   res.json({ Estado: "Tu pedido fue exitoso!" });
// });

// app.post("/", (req, res) => {
//   res.status(404).send("Me hiciste un post");
// });

// app.post("/hola", (req, res) => {
//   res.send("Me hiciste un post en la ruta hola");
// });

// app.listen(port, () => {
//   console.log(`App corriendo en puerto ${port}`);
// });

const express = require("express");
const app = express();
const port = 8080;
const fs = require("fs");

app.use(express.json());

// app.get("/", (req, res) => {
//   res.json({ Estado: "Bienvenido a mi API" });
// });

app.get("/gatitos", (req, res) => {
  fs.readFile(`${__dirname}/assets/cats.json`, (err, data) => {
    const dataJson = JSON.parse(data);
    res.json({ status: "success", data: dataJson });
  });
});

app.get("/gatitos/:id", (req, res) => {
  fs.readFile(`${__dirname}/assets/cats.json`, (err, data) => {
    const gatitos = JSON.parse(data);
    const id = Number(req.params.id);
    const gatosFiltrados = gatitos.filter((gato) => gato.id === id);

    if (!gatosFiltrados.length) {
      return res.status(404).json({
        status: "fail",
        message: "Gato no encontrado",
      });
    }

    res.json({ status: "success", data: gatosFiltrados });
  });
});

// app.post("/gatitos", (req, res) => {
//   console.log(req);
//   res.json({ status: "success" });
// });

app.post("/gatitos", (req, res) => {
  fs.readFile(`${__dirname}/assets/cats.json`, (err, data) => {
    const dataJSON = JSON.parse(data);
    const nuevoGato = req.body;
    nuevoGato.id = dataJSON.length;
    dataJSON.push(nuevoGato);

    fs.writeFile(
      `${__dirname}/assets/cats.json`,
      JSON.stringify(dataJSON),
      (err) => {
        res.status(201).json({
          status: "success",
          data: {
            nuevoGato,
            createdAt: new Date(),
          },
        });
      }
    );
  });
});

app.delete("/gatitos/:id", (req, res) => {
  fs.readFile(`${__dirname}/assets/cats.json`, (err, data) => {
    const dataJson = JSON.parse(data);
    const id = Number(req.params.id);
    const gatosFiltrados = dataJson.filter((gato) => gato.id !== id);

    fs.writeFile(
      `${__dirname}/assets/cats.json`,
      JSON.stringify(gatosFiltrados),
      (err) => {
        if (gatosFiltrados.length === dataJson.length) {
          res
            .status(404)
            .json({ status: "fail", message: "Gato no necontrado" });
        }
        res.status(200).json({ status: "success", data: gatosFiltrados });
      }
    );
  });
});

app.put("/gatitos/:id", (req, res) => {
  fs.readFile(`${__dirname}/assets/cats.json`, (err, data) => {
    const dataJSON = JSON.parse(data);
    const id = Number(req.params.id);
    const gatoModificado = req.body;
    const nuevoArray = [
      ...dataJSON.slice(0, id),
      gatoModificado,
      ...dataJSON.slice(id + 1),
    ];

    fs.writeFile(
      `${__dirname}/assets/cats.json`,
      JSON.stringify(nuevoArray),
      (err) => {
        res.status(200).json({ status: "success", data: nuevoArray });
      }
    );
  });
});

app.listen(port, () => {
  console.log(`App corriendo en puerto ${port}`);
});
