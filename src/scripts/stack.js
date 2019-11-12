// 先进后出，像盘子
class Stack {
    constructor() {
        this.items = [];
    }

    push(item) {
        this.items.push(item);
    }

    pop() {
        return this.items.pop();
    }

    get peek() {
        return this.items[this.items.length - 1];
    }

    get isEmpty() {
        return !this.items.length;
    }

    get size() {
        return this.items.length;
    }

    clear() {
        this.items = [];
    }

    print() {
        this.items.toString();
    }
}
