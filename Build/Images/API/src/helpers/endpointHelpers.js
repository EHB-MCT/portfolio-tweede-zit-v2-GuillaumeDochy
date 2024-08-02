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

/**
 * Check the description of an event
 * @param {description} des 
 * @returns false if no match, true if right type
 */
function checkEventDescription(des){
    if(
        des == null 
        || des.length <= 1 
        || typeof(des) != "string"
    ){
        return false
    }
    return true
}

/**
 * Check the start date of an event
 * @param {start date} start 
 * @returns false if no match, true if right type
 */
function checkEventStartDate(start){
    if(
        start == null 
        || start.length <= 1 
        || typeof(start) == "string"
        || typeof(start) != "string"
    ){
        return false
    }
    return true
}

/**
 * Check the end date of an event
 * @param {end date} end 
 * @returns false if no match, true if right type
 */
function checkEventEndDate(end){
    if(
        end == null 
        || end.length <= 1 
        || typeof(end) == "string"
        || typeof(end) != "string"
    ){
        return false
    }
    return true
}

module.exports = {
    checkEventName,
    checkEventDescription,
    checkEventStartDate,
    checkEventEndDate
}