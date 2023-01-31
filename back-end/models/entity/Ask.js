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
    },
    isOwnerRequest: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false // Si false la personne demande a rejoindre, si true elle a été invité
    }
},{
    sequelize: connection,
    modelName: 'asks',
    paranoid: true,
});
module.exports = Ask;