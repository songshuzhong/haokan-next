import React, {useEffect} from 'react';
import {Layout} from '../src/components/lib/layout';

import '../src/styles/flex.less';

const useDidMount = fn => useEffect(fn, []);

const Flex = () => {
    useDidMount(() => console.log('did mount'));

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
                    <h1>h1</h1>
                </div>
            </div>
        </Layout>
    );
};

export default Flex;
