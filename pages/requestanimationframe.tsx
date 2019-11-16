import React, {useRef, useEffect} from 'react';
import {Layout} from '../src/components/lib/layout';

import '../src/styles/requestanimationframe.less';

const Raf = () => {
    let i = 0;
    let start = 0;
    const jsRef = useRef();
    const jsRef2 = useRef();
    const useAnimation = () => {
        let timer = setInterval(() => {
            // @ts-ignore
            jsRef.current.style.left = 1/3 * (++i) + '%';
            if (i === 300) clearInterval(timer);
        }, 16.7)
    };
    const step = (timestamp) => {
        if (!start) start = timestamp;
        let progress = (timestamp - start) / 3;
        // @ts-ignore
        jsRef2.current.style.left = progress + 'px';

        if (progress < 1650) {
            window.requestAnimationFrame(step);
        }
    };

    useEffect(useAnimation, []);
    useEffect(() => {window.requestAnimationFrame(step)}, []);

    return (
        <Layout>
            <div className='animation'>css</div>
            <div ref={jsRef} className='js'>js</div>
            <div ref={jsRef2} className='js2'>jss</div>
        </Layout>
    );
};

export default Raf;
