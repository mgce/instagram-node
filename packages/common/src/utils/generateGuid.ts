const uuidv4 = require('uuid/v4');

export function generateGuid():string{
    return uuidv4();
}