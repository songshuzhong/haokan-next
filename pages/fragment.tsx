import React, {useEffect} from 'react';

import {Layout} from '../src/components/lib/layout';

let hasDone = 0;
let total = 10000;
let step = total / 50;
const fragmentFactory = () => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < step; i++) {
        const ele = document.createElement('h2');
        // @ts-ignore
        ele.innerText = hasDone * step + i + 1;
        fragment.appendChild(ele);
    }
    document.getElementById('container').appendChild(fragment);
    hasDone++;
};

const useFragmentCreator = () => {
    if (hasDone < step) {
        window.requestAnimationFrame(fragmentFactory);
    }
};

const Fragment = () => {
    useEffect(() => {
        useFragmentCreator()
    }, []);
    return (
        <Layout>
            <div id='container' />
        </Layout>
    );
};

export default Fragment;