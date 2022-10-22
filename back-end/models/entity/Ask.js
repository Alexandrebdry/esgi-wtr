const {DataTypes, Model} = require( "sequelize");
const connection = require ("../database");

class Ask extends Model {}

Ask.init({
    userID:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    groupID:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    sequelize: connection,
    modelName: 'asks',
    paranoid: true,
});
module.exports = Ask;