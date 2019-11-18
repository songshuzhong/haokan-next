const array = [20,18,27,19,35];
/**
 * @desc 时间复杂度O(nlogn)
 * @param arr
 * @returns {Buffer | T[] | string}
 */
const quick = arr => {
    let index = Math.floor(arr.length / 2);
    let pivot = arr.splice(index, 1)[0];
    let left = [];
    let right = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return quick(left).concat([pivot], quick(right));
};
/**
 * @desc 时间复杂度O(n*n)
 * @param arr
 * @returns {*}
 */
const bubbling = arr => {
    const length = arr.length;
    for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
            }
        }
    }
    return arr;
};

const select = arr => {
    const length = arr.length;
    for (let i = 0; i < length; i++) {
        let selected = i;
        for (let j = i; j < length; j++) {
            if (arr[j] < arr[selected]) {
                selected = j;
            }
        }
        if (arr[i] > arr[selected]) {
            [arr[i], arr[selected]] = [arr[selected], arr[i]];
        }
    }

    return arr;
};
console.log(select(array));
