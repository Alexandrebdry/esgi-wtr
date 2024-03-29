const {DataTypes, Model} = require ("sequelize");
const connection = require ("../database");

class Message extends Model {}

Message.init({
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isUpdated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isModerated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
},{
    sequelize: connection,
    modelName: 'messages',
    paranoid: true,
});


module.exports = Message;