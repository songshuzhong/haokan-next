function _bind(context) {
    const self = this;
    const args = Array.prototype.splice.call(arguments, 1);

    return function () {
        const bindArgs = Array.prototype.splice.call(arguments, 1);
        self.apply(context, args.concat(bindArgs));
    }
}
