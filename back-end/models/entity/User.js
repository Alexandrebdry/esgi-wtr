const {DataTypes, Model} = require( "sequelize");
const connection = require( "../database");
const bcrypt = require('bcryptjs');

class User extends Model {}

User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        verify:
            {isEmail: true}
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    confirmationToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isOnline:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    socketId: {
        type:DataTypes.STRING,
        allowNull: true
    }
},
    {
        sequelize: connection,
        modelName: 'users',
        paranoid: true,
    }
);



User.addHook('beforeCreate', async (user) => {
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
});

User.addHook('beforeUpdate', async (user, {fields}) => {
    if(fields.includes('password')) {
        user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
    }
});

module.exports = User;
