exports.connection = require('./database');
exports.User = require('./entity/User');
exports.Message = require('./entity/Message');
exports.Group = require('./entity/Group');
exports.Ask = require('./entity/Ask');
exports.Agenda = require('./entity/Agenda');
exports.Conversation = require('./entity/Conversation') ;
exports.GroupMember = require('./entity/GroupMember') ;


// Messages
exports.User.hasMany(exports.Message, {as: 'messages_send', foreignKey: 'senderID', onDelete: 'CASCADE', hooks: true});
exports.User.hasMany(exports.Message, {as: 'messages_receive', foreignKey: 'receiverID', onDelete: 'CASCADE', hooks: true});
exports.Group.hasMany(exports.Message, {as: 'messages', foreignKey: 'groupID', onDelete: 'CASCADE', hooks: true});

exports.Message.belongsTo(exports.User, {as: 'sender_id', foreignKey: 'senderID'});
exports.Message.belongsTo(exports.User, {as: 'receiver_id', foreignKey: 'receiverID'});
exports.Message.belongsTo(exports.Group, {as: 'group_id', foreignKey: 'groupID'});
exports.Message.belongsTo(exports.Conversation) ;


// Group
exports.User.hasMany(exports.Group, {as: 'groups_owner', foreignKey: 'ownerID', onDelete: 'CASCADE', hooks: true});
exports.Group.belongsTo(exports.User, {as: 'owner_id', foreignKey: 'ownerID'});

exports.Conversation.hasMany(exports.Group,{as:'groups', foreignKey: 'conversationID', onDelete: 'CASCADE', hooks: true});


// Group members
exports.Group.hasMany(exports.GroupMember, {as: 'members' , onDelete:'CASCADE', hooks: true});



// Ask
exports.Group.hasMany(exports.Ask, {as: 'requests', foreignKey: 'groupID', onDelete:'CASCADE', hooks: true});
exports.User.hasMany(exports.Ask, {as: 'requests', foreignKey: 'userID', onDelete:'CASCADE', hooks: true});
exports.Ask.belongsTo(exports.User, {as: 'user_id', foreignKey: 'userID'});
exports.Ask.belongsTo(exports.Group, {as: 'group_id', foreignKey: 'groupID'});
