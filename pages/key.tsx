import React, {useState} from 'react';
import {Layout} from '../src/components/lib/layout';

const useSort = initial => {
    const [items, setItems] = useState(initial);

    const setItemSort = () => setItems([200, 100]);

    return [items, setItemSort];
};

const Key = () => {
    const [items, setItemSort] = useSort([100, 200]);

    return (
        <Layout
            styles={['https://songshuzhong.github.io/visualizer/static/bower_components/bootstrap/dist/css/bootstrap.min.css']}
        >
            {
                items.map((item) =>
                    <div key={item}>
                        <label>{item}</label>
                        <input />
                        <label>{new Date().getTime()}</label>
                    </div>
                )
            }
            <button className='btn default' onClick={setItemSort}>降序</button>
        </Layout>
    );
};

export default Key;
