const {connection} = require("../index");
const {DataTypes, Model} = require("sequelize");

class Conversation extends Model {}

Conversation.init({
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    answerID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    groupID: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "groupe"
    },
},
{
    sequelize: connection,
    modelName: 'conversations',
    paranoid: true,
});

module.exports = Conversation;