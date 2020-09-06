// Leyendo archivos

//     Crear tres archivos de texto con cualquier contenido.

//     Hacer una funcion que muestre en consola el contenido de los archivos. Debe usar fs.readFile, no fs.readFileSync.

//     Hacer una funcion que lea uno de los archivos y cree un nuevo archivo con todo el texto del anterior en mayúsculas.

//     Hacer una función que lea cada uno de los archivos y finalmente cree un cuarto archivo con el contenido de los tres restantes.

const fs = require("fs");

fs.readFile("./assets/nombre.txt", "utf-8", (error, data) => {
  console.log(data);
  fs.readFile("./assets/apellido.txt", "utf-8", (error, data) => {
    console.log(data);
    fs.readFile("./assets/mascota.txt", "utf-8", (error, data) => {
      console.log(data);
    });
  });
});

fs.readFile("./assets/nombre.txt", "utf-8", (err, data) => {
  fs.writeFile(
    "./assets/nuevoTexto.txt",
    data.toLocaleUpperCase(),
    "utf-8",
    (err, data) => {
      console.log(data);
    }
  );
});

let texto = "";
fs.readFile("./assets/nombre.txt", "utf-8", (err, data) => {
  texto = data;
  fs.readFile("./assets/apellido.txt", "utf-8", (err, data) => {
    texto += data;
    fs.readFile("./assets/mascota.txt", "utf-8", (err, data) => {
      texto += data;
      fs.readFile("./assets/nuevoTexto.txt", "utf-8", (err, data) => {
        texto += data;
        fs.writeFile("./assets/texto.txt", texto, "utf-8", (err, data) => {});
      });
    });
  });
});

// Server de gatitos

//     Utilizando el módulo http, crear un server en el puerto 3030 que retorne en la ruta base / el string "Gatitos!".

//     Si el usuario ingresa a la ruta /mostrarGatito, se debe devolver un HTML con un h1 que diga "Gatito!" y la imagen del gatito de tu preferencia.

//     Si el usuario ingresa a la ruta /fotosGatitos, se debe devolver este json

//     Si el usuario ingresa a cualquier otra ruta, devolver un 404 incluyendo los headers correspondientes.

const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url, true);
  if (pathname === "/") {
    res.end("Gatitos!");
  }
  if (pathname === "/mostrarGatito") {
    res.end(
      `<div><h1>Gatitos!</h1><img src='http://www.placekitten.com/300'></div>`
    );
  }
  if (pathname === "/fotosGatitos") {
    fs.readFile("./assets/cats.json", "utf-8", (err, data) => {
      res.end(data);
    });
  }
  if (
    pathname !== "/" &&
    pathname !== "/mostrarGatito" &&
    pathname !== "/fotosGatitos"
  ) {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end(`<h1>Estas en el lugar equivocado</h1>`);
  }
});
server.listen(3030);

// package.json

// El comando echo en la consola sirve para devolver cualquier cosa que escribamos. Probá escribiendo "echo Hola" en tu terminal o consola.

//     Corré el comando npm init en tu proyecto.

//     Crear un script en package.json que reciba el comando "saludar". Al correr npm run saludar en la consola, debemos ver "Hola, este es mi primer script!".

//___________________________;

// calcular Fecha

// Usando el objeto Date podemos saber la fecha actual.

// const fechaActual = new Date();

// O podemos saber una fecha en particular agregando números como argumentos:

// const navidad = new Date(2020,11,25);

//     Crear una función en Node que calcule la fecha actual y la muestre en consola.

//     Crear una función que muestre en consola cuánto falta para tu cumpleaños (en milisegundos, que es lo que devuelve Date)

//     Instalar el paquete de npm pretty-ms. Investigarlo y utilizarlo para mostrar en consola cuántos días faltan para tu cumpleaños.

const prettyMilliseconds = require("pretty-ms");

const getFecha = () => {
  return console.log(new Date());
};
getFecha();

const cumpleañosMS = () => {
  const cumpleaños = new Date(2021, 04, 30);
  return console.log(cumpleaños - new Date());
};
cumpleañosMS();

const cumpleañosDias = prettyMilliseconds(new Date(2021, 04, 30) - new Date(), {
  verbose: true,
});
console.log(cumpleañosDias);
