/**
 *@file
 *@Date 2019/07/01
 *@author sshuzhong
 *@mailTo <a href="mailto:songshuzhong@baidu.com.cn">Song ShuZhong</a>
 *@desc
 *@link
*/
import React from 'react';
import fetch from 'isomorphic-unfetch';
import {inject, observer} from 'mobx-react';

import {Layout} from '../src/components/lib/layout';
import Header from '../src/components/author/header';
import {Image} from '../src/components/author/image';
import {Store} from '../src/stores/author';

import '../src/styles/author.less';

@inject('store')
@observer
export default class Author extends React.Component<any, any> {
    static Store = Store;

    static async getInitialProps(context) {
        const res = await fetch(`https://haokan.baidu.com/haokan/wiseauthor?app_id=${context.router.query.app_id}&_format=json`);
        const {apiData} = await res.json();

        return {
            author: apiData['author'],
            ctime: apiData['video']['ctime'],
            videoList: apiData['video']['results'],
            videoListHasMore: apiData['video']['has_more']
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            active: 0
        };
    }

    componentDidMount() {
        this.props.store.appId = this.getQueryString('app_id');
        window.onscroll = this.debounce(this.onScrollListen.bind(this), 100);
    }

    onScrollListen() {
        const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const isBottom = (scrollTop + clientHeight >= scrollHeight - 50);

        if (isBottom) {
            this.props.store.fetchVideos();
        }
    }

    debounce = (fn, wait) => {
        wait = wait || 0;
        let timerId;

        function debounced() {
            if (timerId) {
                clearTimeout(timerId);

                timerId = null;
            }
            timerId = setTimeout(function () {
                fn();
            }, wait);
        }

        return debounced;
    };

    getQueryString = (name) => {
        const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        const r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return '';
    };

    onTabsChange = (currentTab) => {
        this.props.store.currentTab = currentTab;
        if (currentTab == 0) {
            this.props.store.fetchVideos();
        } else if (currentTab == 1) {
            this.props.store.fetchMiniVideos();
        } else {
            this.props.store.fetchAlbums();
        }
    };

    createItems = ({content}, i) =>
        <div className='hk-video-wrapper' key={i}>
            <div className='title'>
                {
                    content['title']
                }
            </div>
            <Image className='video' src={content['cover_src']}/>
            <div className='duration'>
                <span>{content['duration']}</span>
                <div/>
                <span>{content['duration']}</span>
            </div>
            <div className='foot-bar'>
                <div className='prior'>{content['publish_time']}</div>
                <div>
                    <div className='praise'>
                        <span>&nbsp;{i}</span>
                    </div>
                    <div className='comment'>
                        <span>&nbsp;{content['commentNum']}</span>
                    </div>
                </div>
            </div>
        </div>;

    createMiniItems = ({content}, i) =>
        <div key={i} className='mini-item' style={{backgroundImage: `url(${content['poster_exquisite']})`}}>
            <div className='watch'>
                <img src='/static/img/minivideo-eyes.png'/>
                <span>&nbsp;{content['playcnt']['playcntText']}</span>
            </div>
        </div>;

    createAlbumItems = ({content}, i) =>
        <div key={i} className='hk-album-wrapper'>
            <div className='poster' style={{backgroundImage: `url(${content['poster']})`}}>
                <span style={{alignItems: 'flex-end', fontWeight: 'bold'}}>+{content['video_count']}</span>
                <span style={{alignItems: 'flex-start'}}>视频</span>
            </div>
            <div className='detail'>
                <div className='title'>{content['title']}</div>
                <div className='date'>{content['update_time_text']}</div>
            </div>
        </div>;

    render() {
        const {author, currentTab, videoList, videoMiniList, videoAlbum} = this.props.store;

        return (
            <Layout title={author ? author.name : ''}>
                <Header author={author}/>
                <ul className='hk-tabs-wrapper'>
                    <li className={currentTab == 0 ? 'active' : ''} onClick={() => this.onTabsChange(0)}>
                        <span>视频</span>
                    </li>
                    <li className={currentTab == 1 ? 'active' : ''} onClick={() => this.onTabsChange(1)}>
                        <span>小视频</span>
                    </li>
                    <li className={currentTab == 2 ? 'active' : ''} onClick={() => this.onTabsChange(2)}>
                        <span>合辑</span>
                    </li>
                </ul>
                {
                    currentTab == 0 && videoList.map((item, index) => this.createItems(item, index))
                }
                <div className='hk-mini-wrapper'>
                    {
                        currentTab == 1 && videoMiniList.map((item, index) => this.createMiniItems(item, index))
                    }
                </div>
                {
                    currentTab == 2 && videoAlbum.map((item, index) => this.createAlbumItems(item, index))
                }
            </Layout>
        );
    }
}
