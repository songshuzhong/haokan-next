const flattenDeep = arr => Array.isArray(arr) ? arr.reduce((total, cValue) => [...total, ...flattenDeep(cValue)], []) : [arr];

console.log(flattenDeep([1, [2, 3], [4, [5, [6]]], 9]));