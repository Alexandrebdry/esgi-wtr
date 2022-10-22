const {DataTypes, Model} = require ("sequelize");
const connection = require ("../database");
const SequelizeSlugify = require ('sequelize-slugify');


class Message extends Model {}

Message.init({
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    isUpdated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
},{
    sequelize: connection,
    modelName: 'messages',
    paranoid: true,
});

SequelizeSlugify.slugifyModel(Message, {
    source: ['text', 'senderID']
})
module.exports = Message;