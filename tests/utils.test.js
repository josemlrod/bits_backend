const {isRequiredNeeded, isValidType,} = require('../services/utils');

test('It returns a boolean', () => {
    expect(typeof isValidType({}, 'a', 'a')).toBe('boolean')
});

test('It returns true if typeof obj property matches type', () => {
    expect(isValidType({'name': 'str'}, 'name', 'string')).toBe(true);
});

test('It returns false if obj property is not available, but we expect it to exist', () => {
    expect(isValidType({}, 'name', 'string')).toBe(false);
});

test('It returns false if a full obj w required keys is passed in', () => {
    expect(isRequiredNeeded({
            "username": "someusername",
            "first_name": "jose",
            "last_name": "rodriguez", 
            "firebase_uid": "someotherfirebaseid", 
            "email": "someemail@gmail.com", 
            "rel_status": "Taken"
    })).toBe(false);
});

test('It returns true if an empty obj is passed in', () => {
    expect(isRequiredNeeded({})).toBe(true);
});

test('It returns false if an obj w any of the required props missing is passed in', () => {
    expect(isRequiredNeeded({
        "username": "someusername",
        "first_name": "jose",
        "last_name": "rodriguez", 
    })).toBe(true);
});