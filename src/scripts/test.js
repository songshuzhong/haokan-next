const long = 'acbc45defghijkl';
const short = 'cdi';
let pivot = 0;
for (let i = 0; i < short.length; i++) {
    const subStr = long.substring(pivot);
    for (let j = pivot; j < long.length; j++) {
        if (subStr.indexOf(short[i]) > -1) {
            pivot++;
            continue;
        }
    }
}