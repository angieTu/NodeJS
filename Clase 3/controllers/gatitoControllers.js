const fs = require("fs");

const getGatitos = (req, res) => {
  fs.readFile("./assets/cats.json", (err, data) => {
    const dataJSON = JSON.parse(data);
    res.json({ status: "success", data: dataJSON });
  });
};

const getGatito = (req, res) => {
  fs.readFile(`./assets/cats.json`, (err, data) => {
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
};

const postGatito = (req, res) => {
  fs.readFile(`./assets/cats.json`, (err, data) => {
    const dataJSON = JSON.parse(data);
    const nuevoGato = req.body;
    nuevoGato.id = dataJSON.length;
    dataJSON.push(nuevoGato);
    fs.writeFile(`./assets/cats.json`, JSON.stringify(dataJSON), (err) => {
      res.status(201).json({
        status: "success",
        data: {
          nuevoGato,
          createdAt: new Date(),
        },
      });
    });
  });
};

const deleteGatito = (req, res) => {
  fs.readFile(`./assets/cats.json`, (err, data) => {
    const dataJSON = JSON.parse(data);
    const id = Number(req.params.id);
    const gatosFiltrados = dataJSON.filter((gato) => gato.id !== id);
    fs.writeFile(
      `./assets/cats.json`,
      JSON.stringify(gatosFiltrados),
      (err) => {
        if (gatosFiltrados.length === dataJSON.length) {
          res
            .status(404)
            .json({ status: "fail", message: "Gato no necontrado" });
        }
        res.status(200).json({ status: "success", data: gatosFiltrados });
      }
    );
  });
};

const putGatito = (req, res) => {
  fs.readFile(`./assets/cats.json`, (err, data) => {
    const dataJSON = JSON.parse(data);
    const id = Number(req.params.id);
    const gatoModificado = req.body;
    const nuevoArray = [
      ...dataJSON.slice(0, id),
      gatoModificado,
      ...dataJSON.slice(id + 1),
    ];
    fs.writeFile(`./assets/cats.json`, JSON.stringify(nuevoArray), (err) => {
      res.status(200).json({ status: "success", data: nuevoArray });
    });
  });
};

module.exports = { getGatitos, getGatito, postGatito, deleteGatito, putGatito };
