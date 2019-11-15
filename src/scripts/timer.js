let num = 4543971;

let h = Math.floor((num / 3600) % 24);
let m = Math.floor((num / 60) % 60);
let s = Math.floor(num % 60);

console.log(h, m, s);

function formatSecond(result) {
    const h = Math.floor((result / 3600) % 24);
    const m = Math.floor((result / 60) % 60);
    const s = Math.floor(result % 60);
    result = s + "秒";
    if (m > 0) {
        result = m + "分钟" + result;
    }
    if (h > 0) {
        result = h + "小时" + result;
    }

    return result;
}

console.log(formatSecond(num));
