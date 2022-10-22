exports.connection = require('./database');
exports.User = require('./entity/User');
exports.Message = require('./entity/Message');
exports.Group = require('./entity/Group');
exports.Ask = require('./entity/Ask');
exports.Agenda = require('./entity/Agenda');


// Messages
exports.Message.belongsTo(exports.User, {as: 'sender_id', foreignKey: 'senderID'});
exports.User.hasMany(exports.Message, {as: 'messages_send', foreignKey: 'senderID'});
exports.Message.belongsTo(exports.User, {as: 'receiver_id', foreignKey: 'receiverID'});
exports.User.hasMany(exports.Message, {as: 'messages_receive', foreignKey: 'receiverID'});
exports.Message.belongsTo(exports.Group, {as: 'group_id', foreignKey: 'groupID'});
exports.Group.hasMany(exports.Message, {as: 'messages', foreignKey: 'groupID'});

// Group
exports.Group.belongsTo(exports.User, {as: 'owner_id', foreignKey: 'ownerID'});
exports.User.hasMany(exports.Group, {as: 'groups_owner', foreignKey: 'ownerID'});

// Group members
exports.Group.belongsToMany(exports.User, {through: 'userGroups',as: 'members' ,foreignKey: 'groupID'});
exports.User.belongsToMany(exports.Group, {through: 'userGroups',as: 'members' ,foreignKey: 'userID'});

// Ask
exports.Ask.belongsTo(exports.User, {as: 'user_id', foreignKey: 'userID'});
exports.Ask.belongsTo(exports.Group, {as: 'group_id', foreignKey: 'groupID'});
exports.Group.hasMany(exports.Ask, {as: 'requests', foreignKey: 'groupID'});
exports.User.hasMany(exports.Ask, {as: 'requests', foreignKey: 'userID'});