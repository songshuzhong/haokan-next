const deepFirstSearch = (node, list = []) => {
    if (node) {
        list.push(node);
        const children = node.children;

        for (let i = 0; i < children.length; i++) {
            this.deepFirstSearch(children[i], list);
        }
    }

    return list;
};

const widthFirstSearch = (node) => {
    const stack = [];
    const list = [];

    if (node) {
        stack.push(node);
        while (stack.length) {
            const item = stack.shift();
            const children = item.children;

            list.push(item);

            for (let i = 0; i < children.length; i++) {
                stack.push(children[i]);
            }
        }
    }

    return list;
};

const fibonacii = (n) => {
    if (n === 0 || n === 1) return 1;

    return this.fibonacii(n - 1) + this.fibonacii(n -2);
};

const fibonaciiPlus = (n, ac1 = 1, ac2 = 1) => {
    if (n <= 1) return ac2;

    return this.fibonaciiPlus(n - 1, ac2, ac1 + ac2)
};

const factorial = (n, total) => {
    if (n === 1) return total;

    return this.factorial(n - 1, n * total);
};

function _Class(name) {
    if (new.target === _Class) {
        this.name = name;
        this.id = ++_Class.id;
    } else {
        return new _Class(name);
    }
}

_Class.id = 0;

const quicksort = (arr) => {
    let pivotIndex = Math.floor(arr.length / 2);
    let pivot = arr.splice(pivotIndex, 1)[0];
    let right = [];
    let left = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return quickSort(left).concat([pivot], quickSort(right))
}
