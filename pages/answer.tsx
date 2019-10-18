import React from 'react';
import fetch from 'isomorphic-unfetch';
import {inject, observer} from 'mobx-react';

import {Layout} from '../components/lib/layout';

import '../styles/answer.less';

@inject('store')
@observer
export default class Answer extends React.Component<any, any> {
    static async getInitialProps(context) {
        const {title, sid} = context.router.query;
        const res = await fetch(`http://yq01-lvrui01-rmb.epc.baidu.com:8382/answer/wise/haokansearch?title=${encodeURIComponent(title)}&version=5.4&sid=${encodeURIComponent(sid)}&_format=json`);
        const {data: {apiData}} = await res.json();
        return apiData;
    }

    constructor(props) {
        super(props);
        this.state = props;
    }

    createVideo = (card, index) =>
        <article className='video-item item' key={index}>
            <a href={card.video_short_url} className='video-url'>
                <div className='video-img-wrap'>
                    <img className='video-img' src={card.cover_src} alt={card.title}/>
                    <span className='video-duration'>{card.duration}</span>
                </div>
                <div className='video-copy'>
                    <h3 className='video-title'>{card.title}</h3>
                    <div className='video-extra'>
                        <span className='video-author'>
                            {card.author}
                        </span>
                        <span className='video-play'>{card.playcntText}</span>
                        <span className='video-publish'>{card.publishTimeText}</span>
                    </div>
                </div>
            </a>
        </article>;

    createHowTo = (item, index) =>
        <article className='hk-howTo-wrapper' key={index}>
            <div className='title'>{item.title}</div>
            {
                item.video_list.map((video, index) =>
                    <div className='video' key={index}>
                        <div className='cover' style={{backgroundImage: `url(${video.cover_src})`}}>
                            <div className='prior'>{video.publishTimeText}</div>
                            |
                            <div className='duration'>{video.duration}</div>
                        </div>
                        <h3 className='title1'>{video.title}</h3>
                        <div className='detail'>
                            <div className='author'>{video.author}</div>
                            <div className='times'>{video.playcntText}</div>
                        </div>
                    </div>
                )
            }
        </article>;

    createBjhList = (card, index) =>
        <article className='bjh-item item'>
            <a href={card.url_land} className='bjh-url' key={index}>
                <div className='bjh-icon-wrap'>
                    <img className='bjh-icon' src={card.author_icon} alt={card.name}/>
                </div>
                <div className='bjh-copy'>
                    <h3 className='bjh-name'>{card.name}</h3>
                    <div className='bjh-digest'>{card.intro}</div>
                    <div className='bjh-extra'>
                        <span className='bjh-fans'>{card.fansCntText}</span>
                        <span className='bjh-video'> &middot; {card.videoCntText}</span>
                        <span className='bjh-play'> &middot; {card.totalPlaycntText}</span>
                    </div>
                </div>
                <div className='bjh-focus'>关注</div>
            </a>
            <div className='bjh-video-list'>
                {
                    card.author_video.video_list.map((video, index) =>
                        <div className='list' key={index}>
                            <div className='cover' style={{backgroundImage: `url(${video.conver_src})`}}>
                                <div className='prior'>{video.publish_time}</div>
                                |
                                <div className='duration'>{video.duration}</div>
                            </div>
                            <h3 className='title1 ellipsisLn'>{video.title}</h3>
                        </div>
                    )
                }
            </div>
        </article>;

    createBigcard = (card, index) =>
        <article className='hk-video-wrapper' key={index}>
            <div className='title'>{card.title}</div>
            <div className='btn-play'/>
            <img className='video' src={card.cover_src}/>
            <div className='duration'>
                <span>
                    {card.playcntText}
                </span> &nbsp;|
                <div/>
                <span>{card.duration}</span>
            </div>
            <div className='foot-bar'>
                <div>
                    <img src={card.author_icon}/>
                    <div className='prior'>{card.author}</div>
                </div>
                <div>
                    <div className='comment'>
                        <span>{card.publishTimeText}</span>
                    </div>
                </div>
            </div>
        </article>;

    createVariety = (card, index) =>
        <article className='hk-searchVariety-wrapper' key={index}>
            <div className='body'>
                <img className='logo' src={card.poster}/>
                <div className='info'>
                    <h3 className='title'>{card.$title}</h3>
                    <p>{card.resources[0].update}</p>
                    <p>{card.resources[0].siteName}</p>
                    <div className='watch'>立即观看</div>
                </div>
            </div>
            <ul className='footer'>
                {card.resources[0].episode.map((link, index) =>
                    <li className='btn' key={index}>
                        <a href={link.link}>{link.text}</a>
                    </li>
                )}
            </ul>
        </article>;

    createMoive = (card, index) =>
        <article className='hk-searchVariety-wrapper' key={index}>
            <div className='body'>
                <img className='logo' src={card.poster}/>
                <div className='info'>
                    <h3 className='title'>{card.title}</h3>
                    <p>{card.score}</p>
                    <p>{card.actors}</p>
                    <p>{card.resources[0].siteName}</p>
                    <div className='watch'>立即观看</div>
                </div>
            </div>
        </article>;

    createTV = (card, index) =>
        <article className='hk-searchtv-wrapper' key={index}>
            <div className='body'>
                <img className='logo' src={card.poster}/>
                <div className='info'>
                    <h3 className='title'>{card.title}</h3>
                    <p>{card.resources[0].update}</p>
                    <p>{card.actors}</p>
                    <p>{card.resources[0].siteName}</p>
                    <div className='watch'>立即观看</div>
                </div>
            </div>
            <ul className='footer'>
                {card.resources[0].episode.map((link, index) =>
                    <li className='btn' key={index}>
                        <a href={link.link}>{link.text}</a>
                    </li>)}
            </ul>
        </article>;

    render() {
        const {store} = this.state;
        const metas = [
            {name: 'logid', content: store.logid},
            {name: 'query', content: store.search.data.cate[0]}
        ];
        return (
            <Layout title={store.search.data.cate[0]} metas={metas}>
                <div>{store.search.data.cate[0]}</div>
                <div>百家号视频为空，msg：{store.search.msg}，status：{store.search.status}</div>
                <div>长视频为空，msg：{store.search.msg}，status：{store.search.status}</div>
                <div>普通视频为空，msg：{store.search.msg}，status：{store.search.status}</div>
                {
                    store.search.data.list.map((card, index) => {
                        switch (card.tplName) {
                            case 'videoList':
                                return this.createVideo(card, index);
                            case 'searchHowToCard':
                                return this.createHowTo(card, index);
                            case 'search_bjhList':
                                return this.createBjhList(card, index);
                            case 'search_big_card':
                                return this.createBigcard(card, index);
                            case 'search_variety':
                                return this.createVariety(card, index);
                            case 'search_movie':
                                return this.createMoive(card, index);
                            case 'search_tv':
                                return this.createTV(card, index);
                        }
                    })
                }
            </Layout>
        );
    }
}
