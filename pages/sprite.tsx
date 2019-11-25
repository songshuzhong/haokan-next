/**
 *@file
 *@Date 2019/07/01
 *@author sshuzhong
 *@mailTo <a href="mailto:songshuzhong@baidu.com.cn">Song ShuZhong</a>
 *@desc
 *@link
    */
import React, {Fragment} from 'react';
import fetch from 'isomorphic-unfetch';

import {Layout} from '../src/components/lib/layout';

import '../src/styles/sprite.less';

const Author = (props) => {
    const {author} = props.pageProps;

    return (
        <Layout title={author ? author.name : ''}>
            <div className='hk-header-wrapper'>
                <div className='profile'>
                    <img className='photo' src={author.avatar} />
                    {
                        author.vip && author.vip > 0 && author.vip < 4
                            ? <img className='fork' src={`/static/img/icon-v-${author.vip}.png`} />
                            : ''
                    }
                    <div className='nick'>{author.name}</div>
                    <div className={author.is_subscribe ? 'btn-clicked' : 'btn-click'}>
                        {author.is_subscribe ?
                            '已关注' :
                            <Fragment>
                                <img src='/static/img/icon-plus.png' />&nbsp;关注
                            </Fragment>
                        }
                    </div>
                </div>
                <div className='wishes'>
                    {
                        author.baidu_authentication ?
                            <div>
                                <img className='certification' />
                                <span>
                                    {
                                        author.baidu_authentication.length > 25
                                            ? author.baidu_authentication.substring(0, 25) + '...'
                                            : author.baidu_authentication
                                    }
                                </span>
                            </div> : null
                    }
                    {
                        author.wishes ?
                            <div>
                                <img className='author' />
                                <span>{author.wishes}</span>
                            </div> : null
                    }
                </div>
                <div className='works'>
                    {
                        author.fansCnt > 100000000 ?
                            <Fragment>
                                <span>{(author.fansCntText.replace('亿粉丝', '')) + '亿'}</span>&nbsp;粉丝
                            </Fragment> :
                            author.fansCnt > 10000 ?
                                <Fragment>
                                    <span>{(author.fansCntText.replace('万粉丝', '')) + '万'}</span>&nbsp;粉丝
                                </Fragment> :
                                <Fragment>
                                    <span>{author.fansCntText.replace('粉丝', '')}</span>&nbsp;粉丝
                                </Fragment>
                    }
                    {
                        author.totalPlaycnt == 0 ?
                            null :
                            author.totalPlaycnt > 100000000 ?
                                <Fragment>
                                    <span>{(author.totalPlaycntText.replace('亿次播放', '')) + '亿'}</span>&nbsp;播放
                                </Fragment> :
                                author.totalPlaycnt > 10000 ?
                                    <Fragment>
                                        <span>{author.totalPlaycntText.replace('万次播放', '') + '万'}</span>&nbsp;播放
                                    </Fragment> :
                                    <Fragment>
                                        <span>{author.totalPlaycntText.replace('次播放', '')}</span>&nbsp;播放
                                    </Fragment>
                    }
                    {
                        author.videoCnt == 0 ?
                            null :
                            author.videoCnt > 100000000 ?
                                <Fragment>
                                    <span>{(author.videoCntText.replace('亿个视频', '')) + '亿'}</span>&nbsp;视频
                                </Fragment> :
                                author.videoCnt > 10000 ?
                                    <Fragment>
                                        <span>{author.videoCntText.replace('万个视频', '') + '万'}</span>&nbsp;视频
                                    </Fragment> :
                                    <Fragment>
                                        <span>{author.videoCntText.replace('个视频', '')}</span>&nbsp;视频
                                    </Fragment>
                    }
                </div>
            </div>
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
