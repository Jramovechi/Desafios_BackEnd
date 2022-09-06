const express = require("express");
const { Router } = express;

const ContenedorArchivo = require("./contenedores/ContenedorArchivo.js");

//--------------------------------------------
// instancio servidor y persistencia

const app = express();

const productosApi = new ContenedorArchivo("dbProductos.json");
const carritosApi = new ContenedorArchivo("dbCarritos.json");

//--------------------------------------------
// permisos de administrador

const esAdmin = true;

function crearErrorNoEsAdmin(ruta, metodo) {
  const error = {
    error: -1,
  };
  if (ruta && metodo) {
    error.descripcion = `ruta '${ruta}' metodo '${metodo}' no autorizado`;
  } else {
    error.descripcion = "no autorizado";
  }
  return error;
}

function soloAdmins(req, res, next) {
  if (!esAdmin) {
    res.json(crearErrorNoEsAdmin());
  } else {
    next();
  }
}

//--------------------------------------------
// configuro router de productos

const productosRouter = new Router();

productosRouter.get("/", async (req, res) => {
  const objetos = await productosApi.listarAll();
  res.send(objetos);
});

productosRouter.post("/", soloAdmins, async (req, res) => {
  const a = req.body;
  const add = await productosApi.guardar(a);

  if (admin != true) {
    res.send(soloAdmins);
  } else {
    res.send(add);
  }
});

productosRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const objetos = await productosApi.listar(id);
  res.send(objetos);
});

productosRouter.delete("/:id", async (req, res) => {
  const idDelete = req.params.id;
  const deleteId = await productosApi.borrar(idDelete);
  res.send(deleteId);
});

productosRouter.put("/:id", async (req, res) => {
  const ids = req.params.id;
  const obj = req.body;
  const updatedObj = await productosApi.actualizar(ids, obj);
  res.send(updatedObj);
});

//--------------------------------------------
// configuro router de carritos

const carritosRouter = new Router();

carritosRouter.get("/", async (req, res) => {
  const carros = await carritosApi.listarAll();
  res.send(carros);
});

carritosRouter.post("/", async (req, res) => {
  carritosApi.guardar().then((resp) => res.send(resp));
});

carritosRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deleteCart = await carritosApi.borrar(id);
  if (isNaN(id)) {
    res.send("El valor ingresado no es un numero");
  } else {
    res.send(deleteCart);
  }
});

carritosRouter.get("/:id/productos", async (req, res) => {
  const id = req.params.id;
  const idProd = await carritosApi.listar(id);
  res.send(idProd);
});

carritosRouter.post("/:id/productos/:id_prod", async (req, res) => {
  const id = req.params.id;
  const id_prod = req.params.id_prod;
  carritosApi.listar(id_prod).then((resp) => {
    carritosApi.guardar(resp, id).then((respuesta) => res.send(respuesta));
  });
});

carritosRouter.delete("/:id/productos/:id_prod", async (req, res) => {
  const id = req.params.id;
  const id_prod = req.params.id_prod;
  const updCartId = await carritosApi.actualizar(id, id_prod);
  res.send(updCartId);
});

//--------------------------------------------
// configuro el servidor

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/productos", productosRouter);
app.use("/api/carritos", carritosRouter);

module.exports = app;
