const { v4: uuid } = require('uuid');

module.exports =  function generateUniqueId(){
    return uuid();
}