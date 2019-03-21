const isValidType = (obj, propertyName, propertyType) => {
    return typeof obj[propertyName] === propertyType
}

const isRequiredNeeded = body => {
    const required = [
        isValidType(body, 'username', 'string'),
        isValidType(body, 'firebase_uid', 'string'),
        isValidType(body, 'email', 'string'),
        isValidType(body, 'rel_status', 'string'),
        isValidType(body, 'first_name', 'string'),
        isValidType(body, 'last_name', 'string'),
    ];


    if (required.some(isValid => isValid === false)) {
        return true;
    }

    return false;
}

const isUserID = user_id => {
    if (isNaN(parseInt(user_id)) || !user_id) {
        return true;
    } else {
        return false;
    }
}



module.exports = {isRequiredNeeded, isValidType, isUserID,}