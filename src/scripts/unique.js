unique = () => {
    const array = this.state.array.sort((a, b) => a - b);
    let index = 0;
    let pre = array[0];

    for (let i = 0; i < array.length; i++) {
        if (pre != array[i]) {
            index++;
            pre = array[i];
        }

        array[index] = array[i];
        console.log(array);
    }

    return array.slice(0, index + 1);
}
