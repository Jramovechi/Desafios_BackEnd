const { promises: fs } = require("fs");
const moment = require("moment");

class ContenedorArchivo {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async listar(id) {
    const objs = await this.listarAll();
    const buscado = objs.find((o) => o.id == id);
    return buscado;
  }

  async listarAll() {
    try {
      const objs = await fs.readFile(this.ruta, "utf-8");
      return JSON.parse(objs);
    } catch (error) {
      return [];
    }
  }

  async guardar(obj) {
    const objs = await this.listarAll();

    let newId;
    if (objs.length == 0) {
      newId = 1;
    } else {
      newId = objs[objs.length - 1].id, ++1;
    }

    const newObj = { ...obj, timestamp: moment().format("L LTS"), id: newId };
    objs.push(newObj);

    try {
      await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
      return newObj;
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async actualizar(elem) {
    try {
      const objs = await this.listarAll();
      const index = objs.findIndex((o) => o.id === elem.id);

      if (index >= 0) {
        const updatedObject = await {
          ...elem,
          timestamp: moment().format("L LTS"),
          id: elem.id,
        };
        objs[index] = updatedObject;
        await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
        return updatedObject;
      } else {
        return false;
      }
    } catch (err) {
      console.log("ERROR ->", err);
    }
  }

  async borrar(id) {
    const objs = await this.listarAll();
    const index = objs.findIndex((o) => o.id == id);
    if (index == -1) {
      throw new Error(`Error al borrar: no se encontró el id ${id}`);
    }

    objs.splice(index, 1);
    try {
      await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async borrarAll() {
    try {
      await fs.writeFile(this.ruta, JSON.stringify([], null, 2));
    } catch (error) {
      throw new Error(`Error al borrar todo: ${error}`);
    }
  }
}

module.exports = ContenedorArchivo;
