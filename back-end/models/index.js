exports.connection = require('./database');
exports.User = require('./entity/User');
exports.Message = require('./entity/Message');
exports.Group = require('./entity/Group');
exports.Ask = require('./entity/Ask');
exports.Agenda = require('./entity/Agenda');


// Messages
exports.Message.belongsTo(exports.User, {as: 'sender_id', foreignKey: 'senderID'});
exports.Message.belongsTo(exports.User, {as: 'receiver_id', foreignKey: 'receiverID'});
exports.Message.belongsTo(exports.Group, {as: 'group_id', foreignKey: 'groupID'});

// Group
exports.Group.belongsTo(exports.User, {as: 'owner_id', foreignKey: 'ownerID'});
exports.Group.belongsToMany(exports.User, {through: 'userGroups', foreignKey: 'groupID'});
exports.User.belongsToMany(exports.Group, {through: 'userGroups', foreignKey: 'userID'});

// Ask
exports.Ask.belongsTo(exports.User, {as: 'user_id', foreignKey: 'userID'});
exports.Ask.belongsTo(exports.Group, {as: 'group_id', foreignKey: 'groupID'});