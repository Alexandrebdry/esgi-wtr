const {connection} = require("../index");
const {DataTypes, Model} = require("sequelize");

class UserGroup extends Model {}

UserGroup.init({
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    groupID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},
{
    sequelize: connection,
    modelName: 'userGroups',
    paranoid: true,
});

module.exports = UserGroup;