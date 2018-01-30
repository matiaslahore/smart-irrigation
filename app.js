var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var aplicacion = express();

var device = require("./routes/device");

router.get('/', function (request, response) {
    response.status(200).json({"mensaje": "Nuestra primera app con node.js utilizando express"});
});

aplicacion.use(bodyParser.json());

aplicacion.use(router);

aplicacion.use(device);

aplicacion.listen(5000, function () {
    console.log("Servidor iniciado");
});