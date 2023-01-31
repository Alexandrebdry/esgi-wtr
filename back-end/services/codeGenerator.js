exports.generateCode = function () {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < 70; i++) {
        token += characters[Math.floor(Math.random() * characters.length )];
    }
    return token ;
}