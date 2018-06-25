const {
    stringp,
    eql,
    intp,
    floatp
} = require('./dist/predicate')
const l = console.log;


l(intp(233))
l(floatp(2.33))