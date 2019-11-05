import React from 'react';

import {Layout} from '../src/components/lib/layout';
import {Modal} from '../src/components/modal';
import JSONP from '../src/scripts/jsonp';

export default class SearchInput extends React.Component<any, any> {
    private canRun = true;
    private count = 0;
    private index = 0;

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            keyword: '',
            preFetchList: [],
            showModal: false
        };
    }

    componentDidMount() {
        document
            .addEventListener('click',
            () => console.log('document is clicked')
            , false);
        document
            .querySelector('#__next')
            .addEventListener('click', () => console.log('next is clicked'), false);
        document
            .getElementsByTagName('h1')[0]
            .addEventListener('click', () => console.log('li is clicked'), false)
    }

    onPreFetch = () => {
        console.log('执行了：', this.count++);
        if (!this.canRun) return;
        this.canRun = false;

        let timer = setTimeout(() => {
            this.canRun = true;

            JSONP('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + this.state.keyword, {param: 'cb'}, (err, data) => {
                if (err) alert(err);
                console.log('真正请求了：', this.index++);
                const {s} = data;
                this.setState({preFetchList: s});
            });

            clearTimeout(timer);
        }, 500);
    };

    onInputChange = (e) => {
        const keyword = e.target.value;
        this.setState({keyword}, () => {
            this.onPreFetch();
        });
    };

    handleClick = () => {
        console.log('item is clicked');
        // window.open('https://www.baidu.com/s?wd=' + this.state.keyword, '_blank');
    };

    render() {
        const {index, keyword, preFetchList, showModal} = this.state;

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
                        onChange={this.onInputChange} />
                    <ul className='list-group'>
                        {
                            preFetchList.map((item, key) =>
                                <li
                                    key={key}
                                    className={key === index ? 'list-group-item active' : 'list-group-item'}
                                    onClick={this.handleClick} >
                                    {item}
                                </li>
                            )
                        }
                    </ul>
                    <h1 onClick={() => {
                        console.log('li is clicked 2');
                        this.setState({showModal: true});
                    }}>{keyword}</h1>
                    <Modal show={showModal} onClose={() => this.setState({showModal: false})}
                           onOK={() => this.setState({showModal: false})}/>
                </div>
            </Layout>
        );
    }
}
