const {Model, DataTypes} = require("sequelize");
const {connection} = require("../index");

class GroupMember extends Model {}

GroupMember.init({
    groupId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

},{
    sequelize: connection,
    modelName: 'GroupMember',
    paranoid: true,
});



module.exports = GroupMember;