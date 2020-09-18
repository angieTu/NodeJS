const fs = require("fs");

const getRefugios = (req, res) => {
  fs.readFile("./assets/refugios.json", (err, data) => {
    const dataJSON = JSON.parse(data);
    res.json({ status: "success", data: dataJSON });
  });
};

const getRefugio = (req, res) => {
  fs.readFile("./assets/refugios.json", (err, data) => {
    const dataJSON = JSON.parse(data);
    const id = Number(req.params.id);
    const refugiosFiltrados = dataJSON.filter((data) => data.id === id);
    if (!refugiosFiltrados.length) {
      res
        .status(404)
        .json({ status: "fail", message: "Refugio no encontrado" });
    }
    res.json({ status: "success", data: refugiosFiltrados });
  });
};

const postRefugio = (req, res) => {
  fs.readFile("./assets/refugios.json", (err, data) => {
    const dataJSON = JSON.parse(data);
    const nuevoRefugio = req.body;
    nuevoRefugio.id = dataJSON.length;
    dataJSON.push(nuevoRefugio);
    fs.writeFile("./assets/refugios.json", JSON.stringify(dataJSON), (err) => {
      res.status(201).json({ status: "success", data: nuevoRefugio });
    });
  });
};

const deleteRefugio = (req, res) => {
  fs.readFile("./assets/refugios.json", (err, data) => {
    const dataJSON = JSON.parse(data);
    const id = Number(req.params.id);
    const refugiosFiltrados = dataJSON.filter((data) => data.id !== id);
    fs.writeFile(
      "./assets/refugios.json",
      JSON.stringify(refugiosFiltrados),
      (err) => {
        if (refugiosFiltrados.length === dataJSON.length) {
          res
            .status(404)
            .json({ status: "fail", message: "Refugio no encontrado" });
        }
        res.status(200).json({ status: "success", data: refugiosFiltrados });
      }
    );
  });
};

const putRefugio = (req, res) => {
  fs.readFile("./assets/refugios.json", (err, data) => {
    const dataJSON = JSON.parse(data);
    const id = Number(req.params.id);
    const refugioModificado = req.body;
    const nuevoArray = [
      ...dataJSON.slice(0, id),
      refugioModificado,
      ...dataJSON.slice(id + 1),
    ];
    fs.writeFile(
      "./assets/refugios.json",
      JSON.stringify(nuevoArray),
      (err) => {
        res.status(200).json({ status: "success", data: nuevoArray });
      }
    );
  });
};

module.exports = {
  getRefugios,
  getRefugio,
  postRefugio,
  deleteRefugio,
  putRefugio,
};
