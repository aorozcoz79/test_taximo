const Sequelize = require('sequelize');
const sequelize = require('../database/database');

const Datos = sequelize.define('datos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    parameters: {
        type: Sequelize.TEXT,
    },
    shoping_centers: {
        type: Sequelize.TEXT,
    },
    roads: {
        type: Sequelize.TEXT,
    },
    minimum_time: {
        type: Sequelize.INTEGER,
    },
    creation_date: {
        type: Sequelize.DATE,
    }
}, {
    timestamps: false
});

module.exports = Datos;
