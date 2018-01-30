var conn = require('./connection');
var mysql = require('mysql'),
    connection = mysql.createConnection(conn);

var device = {};

device.getDevices = function (callback) {
    if (connection) {
        connection.query('SELECT * FROM device', function (error, rows) {
            if (error) {
                throw error;
            } else {
                callback(null, rows);
            }
        });
    }
}

device.getDeviceById = function (id, callback) {
    if (connection) {
        var sql = 'SELECT * FROM device WHERE id = ' + connection.escape(id);
        console.log(sql);
        connection.query(sql, function (error, row) {
            if (error) {
                throw error;
            } else {
                callback(null, row);
            }
        });
    }
}

device.getDeviceByTrackIdDevice = function (track_device, callback) {
    if (connection) {
        var sql = 'SELECT * FROM device WHERE track_device = ' + connection.escape(track_device);
        connection.query(sql, function (error, row) {
            if (error) {
                throw error;
            } else {
                callback(null, row);
            }
        });
    }
}

device.getDeviceStateByTrackId = function (track_device, callback) {
    if (connection) {
        var sql = 'SELECT state FROM device WHERE track_device = ' + connection.escape(track_device)
            + 'ORDER BY id DESC LIMIT 1';
        connection.query(sql, function (error, row) {
            if (error) {
                throw error;
            } else {
                callback(null, row);
            }
        });
    }
}

device.insertDevice = function (deviceData, callback) {
    if (connection) {
        connection.query('INSERT INTO device SET ?', deviceData, function (error, result) {
            if (error) {
                throw error;
            } else {
                callback(null, result.insertId);
            }
        });
    }
}

device.updateDevice = function (userData, callback) {
    if (connection) {
        var sql = 'UPDATE device SET';
        sql += ' track = ' + connection.escape(userData.track);
        sql += ', type_id = ' + connection.escape(userData.type_id);
        sql += ', deleted = ' + connection.escape(userData.deleted);
        sql += ' WHERE id = ' + userData.id;
        connection.query(sql, function (error, result) {
            if (error) {
                throw error;
            } else {
                callback(null, {"mensaje": "Actualizado"});
            }
        });
    }
}

device.deleteDevice = function (id, callback) {
    if (connection) {
        var sql = 'DELETE FROM device WHERE id = ' + connection.escape(id);
        connection.query(sql, function (error, result) {
            if (error) {
                throw error;
            } else {
                callback(null, {"mensaje": "Device Borrado"});
            }
        });
    }
}


module.exports = device;