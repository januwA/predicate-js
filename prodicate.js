(function (f) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    // cmd
    module.exports = f()
  } else if (typeof define === 'function' && define.amd) {
    // amd
    define([], f)
  } else {
    // 没有模块环境
    var g;
    if (typeof window !== "undefined") {
      g = window
    } else if (typeof global !== "undefined") {
      g = global
    } else if (typeof self !== "undefined") {
      g = self
    } else {
      g = this;
    }
    g.p = f();
  }
})(function () {
  return (function () {
    let _tostring = value => Object.prototype.toString.call(value);
    let _getOwn = Object.getOwnPropertyNames;
    let arrayTag = '[object Array]',
      asyncTag = '[object AsyncFunction]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      regexpTag = '[object RegExp]',
      undefinedTag = '[object Undefined]',
      nullTag = '[object Null]',
      promiseTag = '[object Promise]',
      symTag = '[object Symbol]',
      setTag = '[object Set]',
      weaksetTag = '[object WeakSet]',
      mapTag = '[object Map]',
      weakmapTag = '[object WeakMap]',
      stringTag = '[object String]';

    function stringp(value) {
      return typeof value === 'string' || _tostring(value) === stringTag;
    }

    function numberp(value) {
      return typeof value === 'number' &&
        _tostring(value) === numberTag &&
        Number.isFinite(value) &&
        number < Number.MAX_VALUE &&
        number > Number.MIN_VALUE
    }

    function integerp(value) {
      return Number.isInteger(value);
    }


    function booleanp(value) {
      return typeof value === 'boolean' || _tostring(value) === boolTag;
    }

    function undefinedp(value) {
      return typeof value === 'undefined' || _tostring(value) === undefinedTag;
    }

    function nullp(value) {
      return _tostring(value) === nullTag;
    }

    function arrayp(value) {
      return Array.isArray ? Array.isArray(value) : _tostring(value) === arrayTag;
    }

    function objectp(value) {
      return _tostring(value) === objectTag;
    }

    function functionp(value) {
      var tag = _tostring(value);
      return tag === funcTag || tag === asyncTag || tag === genTag;
    }

    function promisep(value) {
      return _tostring(value) === promiseTag;
    }

    function datep(value) {
      return _tostring(value) === dateTag;
    }

    function regexpp(value) {
      return _tostring(value) === regexpTag;
    }

    function symbolp(v) {
      return _tostring(v) === symTag;
    }

    function errorp(value) {
      return _tostring(value) === errorTag;
    }

    function setp(value) {
      return _tostring(value) === setTag;
    }

    function mapp(value) {
      return _tostring(value) === mapTag;
    }

    function weakmapp(value) {
      return _tostring(value) === weakmapTag;
    }

    function weaksetp(value) {
      return _tostring(value) === weaksetTag;
    }

    function zerop(value) {
      return value === 0;
    }

    function emptyp(value) {
      if (stringp(value)) return zerop(value.length);
      if (arrayp(value)) return !(0 in value);
      if (objectp(value)) return !(0 in _getOwn(value));
      return false;
    }

    function eql(obj, other) {
      return obj === other;
    }

    function equal(obj, other, equalp) {
      if (equalp === void 0) {
        equalp = false;
      }

      function Equal(obj, other, equalp) {
        var objTag = _tostring(obj);
        var otherTag = _tostring(other);
        if (objTag !== objectTag && objTag !== arrayTag && otherTag !== objectTag && otherTag !== arrayTag) {
          if (equalp && typeof obj === 'string' && typeof other === 'string') {
            return (obj).toLocaleUpperCase() === (other).toLocaleUpperCase();
          }
          return obj === other;
        }
        if (objTag !== otherTag)
          return false; // 集合类型不一样
        if (_getOwn(obj).length !== _getOwn(other).length)
          return false; // 集合元素数量不一样
        if (emptyp(obj) && emptyp(other))
          return true; // 类型一样的空集合，永远相等。
        var data = (function () {
          var data = _getOwn(obj);
          if (objTag === arrayTag) {
            data.pop();
            return data;
          } else {
            return data;
          }
        })();
        for (var i in data) {
          var k = data[i];
          if (k in other) { // 元素是否相交
            var obj_value = obj[k];
            var other_value = other[k];
            var obj_item_tag = _tostring(obj_value);
            var other_item_tag = _tostring(other_value);
            if (obj_item_tag === other_item_tag) {
              if (obj_item_tag === objectTag || obj_item_tag === arrayTag || other_item_tag === objectTag || other_item_tag === arrayTag) {
                return Equal(obj_value, other_value, equalp);
              } else {
                if (obj_value === other_value) {} else {
                  return false;
                }
              }
            } else {
              return false;
            }
          } else {
            return false;
          }
        }
        return true;
      }
      return Equal(obj, other, equalp);
    }

    function equalp(obj, other) {
      return equal(obj, other, true);
    }

    function copytree(tree, all) {
      if (all === void 0) {
        all = true;
      }
      var treeTag = _tostring(tree);
      var res = (function () {
        if (treeTag === objectTag) {
          return {};
        } else if (treeTag === arrayTag) {
          return [];
        } else {
          return tree;
        }
      })();
      if (treeTag !== objectTag && treeTag !== arrayTag)
        return res;
      if (emptyp(tree))
        return res;

      function copyTree(obj, a) {
        var objTag = _tostring(obj);
        if (emptyp(obj))
          return objTag === objectTag ? {} : [];
        var res = objTag === objectTag ? {} : [];
        var o = a ? _getOwn(obj) : obj;
        if (a) {
          for (var i in o) {
            var k = o[i];
            var value = obj[k];
            var valueTag = _tostring(value);
            if (valueTag === arrayTag || valueTag === objectTag) {
              res[k] = copyTree(value, a);
            } else {
              res[k] = value;
            }
          }
        } else {
          for (var k in o) {
            var value = obj[k];
            var valueTag = _tostring(value);
            if (valueTag === arrayTag || valueTag === objectTag) {
              res[k] = copyTree(value, a);
            } else {
              res[k] = value;
            }
          }
        }
        return res;
      }
      var t = all ? _getOwn(tree) : tree;
      if (all) {
        for (var i in t) {
          var k = t[i];
          var value = tree[k];
          var valueTag = _tostring(value);
          if (valueTag === arrayTag || valueTag === objectTag) {
            res[k] = copyTree(value, all);
          } else {
            res[k] = value;
          }
        }
      } else {
        for (var k in t) {
          var value = tree[k];
          var valueTag = _tostring(value);
          if (valueTag === arrayTag || valueTag === objectTag) {
            res[k] = copyTree(value, all);
          } else {
            res[k] = value;
          }
        }
      }
      return res;
    }

    const Predicate = function () {
      this.stringp = stringp;
      this.numberp = numberp;
      this.integerp = integerp;
      this.booleanp = booleanp;
      this.nullp = nullp;
      this.undefinedp = undefinedp;
      this.arrayp = arrayp;
      this.objectp = objectp;
      this.functionp = functionp;
      this.promisep = promisep;
      this.datep = datep;
      this.regexpp = regexpp;
      this.symbolp = symbolp;
      this.errorp = errorp;
      this.setp = setp;
      this.mapp = mapp;
      this.weakmapp = weakmapp;
      this.weaksetp = weaksetp;
      this.zerop = zerop;
      this.emptyp = emptyp;
      this.eql = eql;
      this.equal = equal;
      this.equalp = equalp;
      this.copytree = copytree;
    }
    return new Predicate()
  })()
});