/**
 *@file
 *@author sshuzhong
 *@mailTo <a href="mailto:songshuzhong@baidu.com.cn">Song ShuZhong</a>
 *@Date 2019/0701
 *@desc 作者分享页
 */
import { observable, action, runInAction } from 'mobx';

export class Store {
    @observable appId = '';
    @observable ctime = null;
    @observable ctimeMini = null;
    @observable ctimeAlbum = null;
    @observable author = null;
    @observable currentTab = 0;
    @observable priorVideo = -1;
    @observable isNetwork = true;

    @observable videoListPN = 1;
    @observable videoListHasMore = false;
    @observable videoListIsFetch = false;
    @observable videoList = [];

    @observable videoMiniPN = 0;
    @observable videoMiniHasMore = true;
    @observable videoMiniIsFetch = false;
    @observable videoMiniList = [];

    @observable videoAlbumPN = 0;
    @observable videoAlbumHasMore = true;
    @observable videoAlbumIsFetch = false;
    @observable videoAlbum = [];

    /**
     * 获取视频数据
     *
     * @return {Promise<void>}
     */
    @action fetchVideos = async () => {
        const { appId, videoListPN, videoList, videoListIsFetch } = this;
        if (videoListIsFetch) return;
        try {
            this.videoListIsFetch = true;
            const response = await fetch(`/haokan/wiseauthor?app_id=${appId}&_api=1&_skip=${videoListPN}&ctime=${this.ctime}&_limit=10&video_type=media&sort_type=sort_by_time`);
            // @ts-ignore
            const { apiData: { video: { has_more, results, ctime } } } = await response.json();
            runInAction(() => {
                this.videoListIsFetch = false;
                this.ctime = ctime;
                this.videoListHasMore = has_more;
                this.videoListPN += 1;
                this.videoList = [...videoList, ...results];
            });
        } catch (error) {
            runInAction(() => {
                this.isNetwork = false;
            });
        }
    }

    /**
     * 获取小视频数据
     *
     * @return {Promise<void>}
     */
    @action fetchMiniVideos = async () => {
        const { appId, videoMiniIsFetch, videoMiniPN, videoMiniList } = this;

        if (videoMiniIsFetch) return;

        try {
            this.videoMiniIsFetch = true;
            // @ts-ignore
            const response = await fetch(`/haokan/wiseauthor?app_id=${appId}&_api=1&_skip=${videoMiniPN}&ctime=${this.ctimeMini}&_limit=12&video_type=ugc&sort_type=sort_by_time`);
            const { apiData: { video: { has_more, results, ctime } } } = await response.json();

            runInAction(() => {
                this.videoMiniIsFetch = false;
                this.ctimeMini = ctime;
                this.videoMiniHasMore = has_more;
                this.videoMiniPN += 1;
                this.videoMiniList = [...videoMiniList, ...results];
            });
        } catch (error) {
            runInAction(() => {
                this.isNetwork = false;
            });
        }
    }

    /**
     * 获取合辑数据
     *
     * @return {Promise<void>}
     */
    @action fetchAlbums = async () => {
        const { appId, videoAlbumIsFetch, videoAlbumPN, videoAlbum } = this;

        if (videoAlbumIsFetch) return;

        try {
            this.videoAlbumIsFetch = true;
            // @ts-ignore
            const response = await fetch(`/haokan/wiseauthor?app_id=${appId}&_api=1&_skip=${videoAlbumPN}&ctime=${this.ctimeAlbum}&_limit=10&video_type=topic&sort_type=sort_by_time`);
            const { apiData: { video: { has_more, results, ctime } } } = await response.json();
            runInAction(() => {
                this.videoAlbumIsFetch = false;
                this.ctimeAlbum = ctime;
                this.videoAlbumHasMore = has_more;
                this.videoAlbumPN += 1;
                this.videoAlbum = [...videoAlbum, ...results];
            });
        } catch (error) {
            runInAction(() => {
                this.isNetwork = false;
            });
        }
    }
}
