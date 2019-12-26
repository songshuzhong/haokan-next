/**
 *@file
 *@Date 2019/07/01
 *@author sshuzhong
 *@mailTo <a href="mailto:sshuzhong@outlook.com.cn">Song ShuZhong</a>
 *@desc
 *@link
*/
import React, {useState, useEffect} from 'react';
import fetch from 'isomorphic-unfetch';

import {Layout} from '../src/components/lib/layout';
import Header from '../src/components/author/header';
import {Image} from '../src/components/author/image';

import '../src/styles/author.less';

// @ts-ignore
function onScrollListen() {
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const isBottom = (scrollTop + clientHeight >= scrollHeight - 50);

    if (isBottom) {
        // this.props.store.fetchVideos();
    }
}

// @ts-ignore
const debounce = (fn, wait) => {
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

const createItems = ({content}, i) =>
    <div className='hk-video-wrapper' key={i}>
        <div className='title'>{content['title']}</div>
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

const createMiniItems = ({content}, i) =>
    <div key={i} className='mini-item' style={{backgroundImage: `url(${content['poster_exquisite']})`}}>
        <div className='watch'>
            <img src={`${this.props.basename}/static/img/minivideo-eyes.png`}/>
            <span>&nbsp;{content['playcnt']['playcntText']}</span>
        </div>
    </div>;

const createAlbumItems = ({content}, i) =>
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

const Author = props => {
    const {author, videoMiniList, videoAlbum} = props.pageProps;
    const [currentTab, onTabsChange] = useState(0);
    const [videoList, setVideoList] = useState(props.pageProps.videoList);
    const [skip, setSkip] = useState(1);

    useEffect(() => {
        window.onscroll = () => {
            const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const isBottom = (scrollTop + clientHeight >= scrollHeight - 50);

            if (isBottom) {
                fetch(`${props.pageProps.apiPrefix}/author/${props.router.query.app_id}/${skip}`)
                    .then(res => res.json())
                    .then(data => setVideoList([...videoList, ...data.video.results]))
                    .catch(error => console.log(error.toString()));
                setSkip(skip + 1);
            }
        };
    }, []);

    return (
        <Layout title={author ? author.name : ''}>
            <Header author={author} basename={props.pageProps.basename}/>
            <ul className='hk-tabs-wrapper'>
                <li className={currentTab == 0 ? 'active' : ''} onClick={() => onTabsChange(0)}>
                    <span>视频</span>
                </li>
                <li className={currentTab == 1 ? 'active' : ''} onClick={() => onTabsChange(1)}>
                    <span>小视频</span>
                </li>
                <li className={currentTab == 2 ? 'active' : ''} onClick={() => onTabsChange(2)}>
                    <span>合辑</span>
                </li>
            </ul>
            {
                currentTab == 0 && videoList && videoList.map((item, index) => createItems(item, index))
            }
            <div className='hk-mini-wrapper'>
                {
                    currentTab == 1 && videoMiniList && videoMiniList.map((item, index) => createMiniItems(item, index))
                }
            </div>
            {
                currentTab == 2 && videoAlbum && videoAlbum.map((item, index) => createAlbumItems(item, index))
            }
        </Layout>
    );
};

Author.getInitialProps = async context => {
    const res = await fetch(`https://haokan.baidu.com/haokan/wiseauthor?app_id=${context.router.query.app_id}&_format=json`);
    const {apiData} = await res.json();

    return {
        author: apiData['author'],
        ctime: apiData['video']['ctime'],
        videoList: apiData['video']['results'],
        videoListHasMore: apiData['video']['has_more']
    };
};

export default Author;
