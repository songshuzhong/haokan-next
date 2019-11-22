import React, {useEffect, useState, useRef} from 'react';
import {Layout} from '../src/components/lib/layout';
import JSONP from '../src/scripts/jsonp';

const useInputChange = initial => {
    const [keyword, setKeyword] = useState(initial);
    const setInputValue = e => setKeyword(e.target.value);

    return [keyword, setInputValue];
};

const useActiveLi = initial => {
    const [index, setIndex] = useState(initial);
    const setActiveLi = e => setIndex(e.target.getAttribute('data-index'));

    return [index, setActiveLi];
};

const useWillMount = fn => {
    const willMount = useRef(true);
    if (willMount.current) {
        fn();
    }

    useDidMount(() => willMount.current = false);
};

const useDidMount = fn => useEffect(fn, []);

const useDidUpdate = fn => useEffect(fn);

const Hooks = () => {
    const [index, setActiveLi] = useActiveLi(0);
    const [keyword, setInputValue] = useInputChange('');
    const [fetchList, setFetchList] = useState([]);

    useWillMount(() => console.log('will mount'));
    useDidMount(() => console.log('did mount'));
    useDidUpdate(() => console.log('did update'));

    useEffect(() => {
        let timer = setTimeout(() => {
            JSONP('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + keyword, {param: 'cb'}, (err, data) => {
                if (err) alert(err);

                setFetchList(data.s);
            });
            clearTimeout(timer);
        }, 500);
    }, [keyword]);

    return (
        <Layout
            styles={[
                'https://songshuzhong.github.io/visualizer/static/bower_components/bootstrap/dist/css/bootstrap.min.css'
            ]}
            scripts={[
                'https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js',
                'https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js'
            ]}
        >
            <div className='container' style={{height: '150vh', marginTop: '20px'}}>
                <input
                    type='text'
                    className='form-control'
                    placeholder='百度搜索框'
                    onChange={setInputValue} />
                <ul className='list-group'>
                    {
                        fetchList&&fetchList.map((item, key) =>
                            <li
                                key={key}
                                data-index={key}
                                className={key == index ? 'list-group-item active' : 'list-group-item'}
                                onClick={setActiveLi}
                            >
                                {item}
                            </li>
                        )
                    }
                </ul>
                <h1>{keyword}</h1>
            </div>
        </Layout>
    );
};

export default Hooks;
