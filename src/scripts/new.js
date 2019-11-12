function _new(fn) {
    const obj = Object.create(fn.prototype);
    const ret = fn.call(obj);

    return ret instanceof Object ? ret : obj;
}
