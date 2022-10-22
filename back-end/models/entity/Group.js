const {Model, DataTypes} = require("sequelize");
const {connection} = require("../index");
const SequelizeSlugify = require("sequelize-slugify");

class Group extends Model {}

Group.init({
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    slug: {
        type: DataTypes.STRING,
        unique: true,
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

SequelizeSlugify.slugifyModel(Group, {
    source: ['name', 'creatorID']
});

module.exports = Group;