const curry = (fn, args = []) => {
    let length = fn.length;
    return function() {
        const newArgs = args.concat(Array.prototype.splice.call(arguments));
        if (newArgs.length < length) {
            return curry.call(this, fn, newArgs);
        } else {
            return fn.apply(this, newArgs);
        }
    }
};

const fun = (a, b, c) => {
    return a * b * c;
};

const min = curry(fun);

console.log(min(2)(3)(4));