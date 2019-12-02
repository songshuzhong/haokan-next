import React from 'react';
import fetch from 'isomorphic-unfetch';
import {ProgressiveImage} from '../src/components/author/progressive';

import '../src/styles/float-img.less';

const FloatImg = props => {
    return (
        <div className='gallery'>
            {
                props.pageProps.list.map((item, index) => {
                    return (
                        <div className='image-item' key={index}>
                            <ProgressiveImage src={item.middleURL} placeholder='tiny-image.jpg'>
                                {url => <img src={url} alt='an image' />}
                            </ProgressiveImage>
                            <div className='desc' dangerouslySetInnerHTML={{__html: item.fromPageTitle}}>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

FloatImg.getInitialProps = async() => {
    const url = `http://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&ct=201326592&fp=result&queryWord=css&cl=2&lm=-1&ie=utf-8&oe=utf-8&&word=css&nc=1&pn=120&rn=60&gsm=&1574236584657=`;
    const res = await fetch(url);
    const {data} = await res.json();

    return {
        list: data
    };
};

export default FloatImg;
