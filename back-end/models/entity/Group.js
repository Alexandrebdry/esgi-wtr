const {Model, DataTypes} = require("sequelize");
const {connection} = require("../index");

class Group extends Model {}

Group.init({
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isPrivate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    maxUsers: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
},{
    sequelize: connection,
    modelName: 'groups',
    paranoid: true,
});



module.exports = Group;