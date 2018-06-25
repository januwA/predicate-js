import _tostring from './_tostring'
import {
    arrayTag,
    asyncTag,
    boolTag,
    dateTag,
    errorTag,
    funcTag,
    genTag,
    numberTag,
    objectTag,
    undefinedTag,
    regexpTag,
    nullTag,
    promiseTag,
    symTag,
    setTag,
    weaksetTag,
    mapTag,
    weakmapTag,
    formdataTag,
    stringTag,
} from './tag'

export function stringp(value) {
    return typeof value === 'string' || _tostring(value) === stringTag;
}

export function numberp(value) {
    return typeof value === 'number' &&
        _tostring(value) === numberTag &&
        Number.isFinite(value) &&
        number < Number.MAX_VALUE &&
        number > Number.MIN_VALUE
}

export function intp(value) {
    return Number.isInteger(value);
}

export function floatp(value) {
    return !intp(value);
}

export function booleanp(value) {
    return typeof value === 'boolean' || _tostring(value) === boolTag;
}

export function undefinedp(value) {
    return typeof value === 'undefined' || _tostring(value) === undefinedTag;
}

export function nullp(value) {
    return _tostring(value) === nullTag;
}

export function arrayp(value) {
    return Array.isArray ? Array.isArray(value) : _tostring(value) === arrayTag;
}

export function objectp(value) {
    return _tostring(value) === objectTag;
}

export function functionp(value) {
    var tag = _tostring(value);
    return tag === funcTag || tag === asyncTag || tag === genTag;
}

export function promisep(value) {
    return _tostring(value) === promiseTag;
}

export function formdatap(value) {
    return _tostring(value) === formdataTag;
}

export function datep(value) {
    return _tostring(value) === dateTag;
}

export function regexpp(value) {
    return _tostring(value) === regexpTag;
}

export function symbolp(v) {
    return _tostring(v) === symTag;
}

export function errorp(value) {
    return _tostring(value) === errorTag;
}

export function setp(value) {
    return _tostring(value) === setTag;
}

export function mapp(value) {
    return _tostring(value) === mapTag;
}

export function weakmapp(value) {
    return _tostring(value) === weakmapTag;
}

export function weaksetp(value) {
    return _tostring(value) === weaksetTag;
}

export function zerop(value) {
    return value === 0;
}

export function emptyp(value) {
    if (stringp(value)) return zerop(value.length);
    if (arrayp(value)) return !(0 in value);
    if (objectp(value)) return !(0 in _getOwn(value));
    return false;
}

export function eql(obj, other) {
    if(stringp(obj) && stringp(other) && obj === other) return false;
    return obj === other;
}

export function equal(obj, other, equalp) {
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

export function equalp(obj, other) {
    return equal(obj, other, true);
}

export function copytree(tree, all) {
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