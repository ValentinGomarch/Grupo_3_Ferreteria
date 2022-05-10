//requerimientos//
const { append } = require("express/lib/response");
const fs = require("fs");
const multer = require("multer");

//Base DE DATOS//
const path = require("path");
const herramientasFilePath = path.join(__dirname, "../data/PRODUCTS_DATA.json");
var herramientas = JSON.parse(fs.readFileSync(herramientasFilePath, "utf-8"));
const otrosProductos = herramientas;

//CONFIGURACION de RUTAS//
const productController = {
  productDetail: (req, res) => {
    const id = req.params.id;
    const toolFound = herramientas.find((herramienta) => herramienta.id == id);

    if (toolFound) {
      const productDetailData = {
        producto: toolFound,
        otrosProductos,
      };

      res.render("products/productDetail", productDetailData);
    } else {
      res.send("Producto inexistente");
    }
  },

  createProduct: (req, res) => {
    res.render("products/crearproducto");
  },

  createProductPost: (req, res) => {
    const name = req.body.name;
    const discount = req.body.discount;
    const stock = req.body.stock;
    const price = req.body.price;
    const description = req.body.description;
    const color = req.body.colores;
    const subCategory = req.body.subCategory;
    const id = herramientas.length + 1;

    const image_array = req.file;
    const image = image_array.path;

    herramientas.push({
      name,
      discount,
      stock,
      price,
      description,
      color,
      subCategory,
      image,
      id,
    });

    const nuevas_herramientas = JSON.stringify(herramientas);
    fs.writeFileSync(herramientasFilePath, nuevas_herramientas);

    res.redirect("/");
  },

  editProduct: (req, res) => {
    const id = req.params.id;
    const toolFound = herramientas.find((herramienta) => herramienta.id == id);

    if (toolFound) {
      const productoParaModificar = {
        producto: toolFound,
      };
      res.render("products/modificarproducto", productoParaModificar);
    } else {
      res.send("Producto inexistente");
    }
  },

  putProduct: (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    // TODO: incluir color, otros e imágenes que serían los atributos faltantes.

    herramientas.forEach((producto) => {
      if (producto.id === parseInt(id)) {
        producto.name = name;
        producto.price = price;
        producto.description = description;
      }
    });
    const data = JSON.stringify(herramientas, null, 2);
    fs.writeFileSync(herramientasFilePath, data);
    res.redirect("/");
  },
  deleteProduct: (req, res) => {
    function checkProduct(product) {
      if (product.id != req.params.id) {
        return product;
      }
    }
    herramientas = herramientas.filter(checkProduct);
    let newData = JSON.stringify(herramientas);
    fs.writeFileSync(herramientasFilePath, newData);
    res.redirect("/products");
  },

  productList: (req, res) => {
    res.render("products/productList", { products: herramientas });
  },
};

module.exports = productController;
