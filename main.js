const {
    stringp,
    integerp,
    eql
} = require('./dist/predicate')
const l = console.log;


l(eql("1", "1"))