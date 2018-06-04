let {
  stringp,
  equal,
  equalp,
  copytree
} = require('./prodicate')
let l = console.log;

l(stringp('123'))
l( equal({name: 'ajanuw', age: [12, 13]}, {name: 'ajanuw', age: [12, 13]}) )
l( equalp('asd', 'Asd'))


let o = {
  name: 123,
  age: [1, 2]
}
let a = copytree(o)
a.age = [2, 3]

l(a, o)