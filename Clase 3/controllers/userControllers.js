const fs = require("fs");

const getUsers = (req, res) => {
  fs.readFile("./assets/users.json", (err, data) => {
    const dataJSON = JSON.parse(data);
    res.json({ status: "success", data: dataJSON });
  });
};

const getUser = (req, res) => {
  fs.readFile("./assets/users.json", (err, data) => {
    const dataJSON = JSON.parse(data);
    const id = Number(req.params.id);
    const usersFiltrados = dataJSON.filter((data) => data.id === id);
    if (!usersFiltrados.length) {
      res.status(404).json({ status: "fail", message: "User no encontrado" });
    }
    res.json({ status: "success", data: usersFiltrados });
  });
};

const postUser = (req, res) => {
  fs.readFile("./assets/users.json", (err, data) => {
    const dataJSON = JSON.parse(data);
    const nuevoUser = req.body;
    nuevoUser.id = dataJSON.length;
    dataJSON.push(nuevoUser);
    fs.writeFile("./assets/users.json", JSON.stringify(dataJSON), (err) => {
      res.status(201).json({
        status: "success",
        data: {
          nuevoUser,
          createdAt: new Date(),
        },
      });
    });
  });
};

const deleteUser = (req, res) => {
  fs.readFile("./assets/users.json", (err, data) => {
    const dataJSON = JSON.parse(data);
    const id = Number(req.params.id);
    const usersFiltrados = dataJSON.filter((data) => data.id !== id);
    fs.writeFile(
      "./assets/users.json",
      JSON.stringify(usersFiltrados),
      (err) => {
        if (usersFiltrados.length === dataJSON.length) {
          res
            .status(404)
            .json({ status: "fail", message: "User no encontrado" });
        }
        res.status(200).json({ status: "success", data: usersFiltrados });
      }
    );
  });
};

const putUser = (req, res) => {
  fs.readFile("./assets/users.json", (err, data) => {
    const dataJSON = JSON.parse(data);
    const id = Number(req.params.id);
    const userModificado = req.body;
    const nuevoArray = [
      ...dataJSON.slice(0, id),
      userModificado,
      ...dataJSON.slice(id + 1),
    ];
    fs.writeFile("./assets/users.json", JSON.stringify(nuevoArray), (err) => {
      res.status(200).json({ status: "success", data: nuevoArray });
    });
  });
};

module.exports = { getUsers, getUser, postUser, deleteUser, putUser };
