const {connection} = require("../index");
const {DataTypes, Model} = require("sequelize");

class UserGroup extends Model {}

UserGroup.init({
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
    }
},
{
    sequelize: connection,
    modelName: 'conversations',
    paranoid: true,
});

module.exports = UserGroup;