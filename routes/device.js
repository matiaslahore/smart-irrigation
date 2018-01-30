var express = require('express');
var router = express.Router();
var deviceModel = require('../models/device');

router.get('/devices', function (request, response) {
    deviceModel.getDevices(function (error, data) {
        response.status(200).json(data);
    });
});

router.get('/device', function (request, response) {
    var id = request.query.id;
    deviceModel.getDeviceById(id, function (error, datos) {
        if (datos.length > 0) {
            response.status(200).json(datos);
        }
        else {
            response.status(404).json({"Mensaje": "No existe"});
        }
    });
});

router.get('/device/track', function (request, response) {
    var id = request.query.track;
    deviceModel.getDeviceByTrackIdDevice(id, function (error, datos) {
        if (datos.length > 0) {
            response.status(200).json(datos);
        }
        else {
            response.status(404).json({"Mensaje": "No existe"});
        }
    });
});

router.get('/device/state', function (request, response) {
    var id = request.query.track;
    deviceModel.getDeviceStateByTrackId(id, function (error, datos) {
        if (datos.length > 0) {
            response.status(200).json(datos);
        }
        else {
            response.status(404).json({"Mensaje": "No existe"});
        }
    });
});

router.post('/device', function (request, response) {
    var dt = new Date();
    var deviceData = {
        track: request.query.track,
        type_id: request.query.type_id,
        deleted: 0,
        updated: dt,
        created: dt
    };
    deviceModel.insertDevice(deviceData, function (error, datos) {
        if (datos) {
            response.status(200).json({"Mensaje": "Insertado"});
        }
        else {
            response.status(500).json({"Mensaje": "Error"});
        }
    });
});

router.put('/device', function (request, response) {
    deviceModel.getDeviceById(request.query.id, function (error, datos) {
        if (datos.length > 0) {
            var deviceData = {
                id: request.query.id,
                track: request.query.track ? request.query.track : datos[0].track,
                type_id: request.query.type_id ? request.query.type_id : datos[0].type_id,
                deleted: request.query.deleted ? request.query.deleted : datos[0].deleted,
                updated_at: new Date()
            };
            deviceModel.updateDevice(deviceData, function (error, datos) {
                if (datos && datos.mensaje) {
                    response.status(200).json(datos);
                }
                else {
                    response.status(500).json({"mensaje": "Hubo un error al editar el usuario"});
                }
            });
        }
        else {
            response.status(404).json({"Mensaje": "El usuario que quiere editar no existe"});
        }
    });
});

router.delete('/device', function (request, response) {
    var id = request.query.id;
    deviceModel.deleteDevice(id, function (error, datos) {
        if (datos && datos.mensaje) {
            response.status(200).json(datos);
        }
        else {
            response.status(500).json({"mensaje": "Error"});
        }
    });
});


module.exports = router;