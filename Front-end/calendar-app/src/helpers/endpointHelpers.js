/**
 * check the name of an event
 * @param {event name} name 
 * @returns false if no match, true if right type
 */
function checkEventName(name){
    if(
        name == null 
        || name.length <= 1 
        || typeof(name) != "string" 
        || name.length >= 50
    ){
        return false
    }
    return true
}

module.exports = {
    checkEventName
}