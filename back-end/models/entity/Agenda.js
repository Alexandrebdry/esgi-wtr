const {Model, DataTypes} = require( "sequelize");
const {connection} = require("../index");

class Agenda extends Model {}

Agenda.init({
    userID:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    hour: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    sellerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isDriver: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    isOffRoad: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    isSportDriver: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },

},{
    sequelize: connection,
    modelName: 'agendas',
    paranoid: true,
});

module.exports = Agenda;