exports.connection = require('./database');
exports.User = require('./entity/User');
exports.Message = require('./entity/Message');
exports.Group = require('./entity/Group');
exports.Ask = require('./entity/Ask');
exports.Agenda = require('./entity/Agenda');
exports.Conversation = require('./entity/Conversation') ;


// Messages
exports.User.hasMany(exports.Message, {as: 'messages_send', foreignKey: 'senderID', onDelete: 'CASCADE', hooks: true});
exports.User.hasMany(exports.Message, {as: 'messages_receive', foreignKey: 'receiverID', onDelete: 'CASCADE', hooks: true});
exports.Group.hasMany(exports.Message, {as: 'messages', foreignKey: 'groupID', onDelete: 'CASCADE', hooks: true});

exports.Message.belongsTo(exports.User, {as: 'sender_id', foreignKey: 'senderID'});
exports.Message.belongsTo(exports.User, {as: 'receiver_id', foreignKey: 'receiverID'});
exports.Message.belongsTo(exports.Group, {as: 'group_id', foreignKey: 'groupID'});

// Group
exports.User.hasMany(exports.Group, {as: 'groups_owner', foreignKey: 'ownerID', onDelete: 'CASCADE', hooks: true});
exports.Group.belongsTo(exports.User, {as: 'owner_id', foreignKey: 'ownerID'});

// Group members
exports.Group.belongsToMany(exports.User, {through: 'conversations',as: 'members' ,foreignKey: 'groupID', onDelete:'CASCADE', hooks: true});
exports.User.belongsToMany(exports.Group, {through: 'conversations',as: 'members' ,foreignKey: 'userID', onDelete:'CASCADE', hooks: true});
exports.User.belongsToMany(exports.User,{through: 'conversations', as:'answers', foreignKey: 'answerID', onDelete:'CASCADE', hooks: true});

// Ask
exports.Group.hasMany(exports.Ask, {as: 'requests', foreignKey: 'groupID', onDelete:'CASCADE', hooks: true});
exports.User.hasMany(exports.Ask, {as: 'requests', foreignKey: 'userID', onDelete:'CASCADE', hooks: true});
exports.Ask.belongsTo(exports.User, {as: 'user_id', foreignKey: 'userID'});
exports.Ask.belongsTo(exports.Group, {as: 'group_id', foreignKey: 'groupID'});
