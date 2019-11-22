import React from 'react';
import {inject, observer} from 'mobx-react';
import fetch from 'isomorphic-unfetch';

import {Store} from '../src/stores/float-img';

import '../src/styles/float-img.less';

@inject('store')
@observer
export default class FloatImg extends React.Component<any, any> {
    static Store = Store;
    static async getInitialProps() {
        const url = `http://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&ct=201326592&fp=result&queryWord=css&cl=2&lm=-1&ie=utf-8&oe=utf-8&&word=css&nc=1&pn=120&rn=30&gsm=&1574236584657=`;
        const res = await fetch(url);
        const {data} = await res.json();

        return {
            list: data
        };
    }

    render() {
        return (
            <div className='gallery'>
                {
                    this.props.store.list.map((item, index) => {
                        return (
                            <div className='image-item' key={index}>
                                <img src={item.middleURL} />
                                <div className="desc" dangerouslySetInnerHTML={{__html: item.fromPageTitle}}>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}
