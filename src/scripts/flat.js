const flattenDeep = arr => Array.isArray(arr) ? arr.reduce((total, cValue) => [...total, ...flattenDeep(cValue)], []) : [arr];

const a = flattenDeep([1, [[2], [3, [4]], 5]]);
console.log(a);
