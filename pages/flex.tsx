import React, {useEffect} from 'react';
import {Layout} from '../src/components/lib/layout';

import '../src/styles/flex.less';

const Flex = props => {

    useEffect(() => {
        fetch(`${props.apiPrefix}/forceCached`)
            .then(res => res.json())
            .then(data => console.log(data));
        window.onunload = function() {
            const formData = new FormData();
            formData.append('key', '页面关闭了');
            navigator.sendBeacon(`${props.apiPrefix}/sendBeacon`, formData);
        };
    }, []);

    return (
        <Layout>
            <div id='flex'>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
            </div>
            <div id='bfc'>
                <div className='box'>box</div>
                <div className='wrap'>
                    <h1>
                        <a href={`${props.basename}/margin`}>link to margin.</a>
                    </h1>
                </div>
            </div>
        </Layout>
    );
};

export default Flex;
