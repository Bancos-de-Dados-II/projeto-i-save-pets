const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Pet = sequelize.define('Pet', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: DataTypes.ENUM('Cat', 'Dog'),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    gender: {
        type: DataTypes.ENUM('Male', 'Female'),
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    adoptionStatus: {
        type: DataTypes.ENUM('Available', 'Adopted'),
        allowNull: false,
        defaultValue: 'Available',
    },
    localization: {
        type: DataTypes.GEOMETRY,
        allowNull: false
    }
}, {
    tableName: 'pets',
    timestamps: true,
});

async function sincronizar() {
    await Pet.sync();
    console.log("Sincronizado");
}

sincronizar();

module.exports = Pet;
