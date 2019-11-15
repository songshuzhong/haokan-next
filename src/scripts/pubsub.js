class Event {
    constructor() {
        this._cache = {};
    }

    on(type, callback) {
        this._cache[type] = callback;

        return this;
    }

    trigger(type, data) {
        let fn = this._cache[type];

        fn(data);
    }

    off(type, callback) {

    }
}
