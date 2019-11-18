function Vue(data, ele, exp) {
    const self = this;
    this.data = data;

    Object.keys(data).forEach(function(key) {
        self.proxyKeys(key);
    });
    observe(data);
    el.innerHTML = this.data[exp];
    new Watcher(this, exp, function(value) {
        le.innerHeight = value;
    });
    return this;
}
function Watcher(vm, exp, cb) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.value = this.get();
}
Watcher.prototype = {
    update: function() {
        this.run();
    },
    run: function() {
        let value = this.vm.data[this.exp];
        let oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    },
    get: function() {
        Dep.target = this;
        const value = this.vm.data[this.exp];
        Dep.target = null;
        return value;
    }
};
Vue.prototype = {
    proxyKeys: function(key) {
        const self = this;
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get: function proxyGetter() {
                return self.data[key];
            },
            set: function proxySetter(newData) {
                self.data[key] = newData
            }
        })
    }
};