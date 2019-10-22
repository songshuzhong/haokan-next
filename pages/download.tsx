/**
 *@file
 *@Date 2019/07/01
 *@author sshuzhong
 *@mailTo <a href="mailto:songshuzhong@baidu.com.cn">Song ShuZhong</a>
 *@desc 作者分享页
 *@link https://haokan.baidu.com/haokan/download
 */
import React from 'react';
import {inject, observer} from 'mobx-react';
import fetch from 'isomorphic-unfetch';
import '../src/styles/download.less';

@inject('store')
@observer
export default class Download extends React.Component<any, any> {
    static async getInitialProps(context) {
        const query = context.router.query;
        const res = await fetch('https://haokan.baidu.com/haokan/download?_format=json');
        const { apiData: { data } } = await res.json();

        return {
            ...query,
            ...data
        };
    }

    private btn = null;

    constructor(props) {
        super(props);
        this.state = {
            ...props,
            NEW_PKG: '1022340g',
            SOURCE: '1022895z-0-1022340g',
            CKEY: 'CK1404237506338'
        };
    }

    componentDidMount() {
        this.sendThunderLog(1, 2266, 'show');
        if (this.state.pd == 'new_rap') {
            this.btn.style.height = '70px';
            setTimeout(function () {
                window.scroll(0, 60);
            }, 300);
        }
        if (this.state.qr === '0') {
            setTimeout(() => this.onAppInvoking(), 500);
        }
        if (this.state.pd !== this.state.pd) {
            this.setState({ pd: this.state.pd });
        }
    }

    onAppInvoking = () => {
        if (this.state.uLink) {
            this.onInvokeByLink();
            return;
        }
        if (this.state.encodeScheme) {
            this.onInvokeByScheme();
            return;
        }
    }

    /**
     * 通过ulink唤起app
     *
     * @return {void}
     */
    onInvokeByLink = () => {
        /*const target = isIos
            ? 'https://itunes.apple.com/us/app/bai-du-hao-kan/id1092031003'
            : `https://cdn-haokanapk.baidu.com/haokanapk/apk/baiduhaokan${this.state.NEW_PKG}.apk`;
        launch({
            url: this.state.uLink,
            launchType: {
                ios: 'link',
                android: 'link',
            },
            param: {
                ckey: this.state.ckey,
                source: this.state.source,
                pkg: this.state.NEW_PKG,
                target: encodeURIComponent(target)
            }
        }, () => this.state.store == 1 || this.state.reinvoke == 1 ? 3 : 0);*/
    }

    /**
     * 通过scheme唤起app
     *
     * @return {void}
     */
    onInvokeByScheme = () => {
        // const { downloadInfo } = this.state;
        // const android = this.pkg ? `https://cdn-haokanapk.baidu.com/haokanapk/apk/baiduhaokan${this.pkg}.apk` : downloadInfo['pkgurl'];
        /*launch({
            useYingyongbao: inWeixin && isAndroid,
            launchType: {
                ios: inWeixin ? 'store' : 'scheme',
                android: inWeixin ? 'store' : 'scheme'
            },
            param: {
                ckey: this.state.ckey,
                source: this.state.source,
                pkg: this.state.NEW_PKG
            },
            useGuideMethod: inWeibo,
            scheme: this.state.encodeScheme
        }, () => this.state.store == 1 ? 3 : 0);*/
    }

    onInvokeFull = () => {
        if (this.state.fullscreen) {
            this.sendThunderLog();
            this.onAppInvoking();
        }
    }

    sendThunderLog = (cst = 2, tid = 2267, logInfo = 'click') => {
        console.log(cst, tid, logInfo);
        /*const baseParams = {
            ct: 8,
            cst,
            tid,
            logInfo,
            logFrom: 'activity',
            logExtra: {
                pd: this.state.pd,
                t: new Date().getTime().toString(),
                page: 'download'
            }
        };
        sendLog(baseParams);*/
    }

    render() {
        const {
            background_color,
            background_pic,
            button_pic,
            logo
        } = this.props.store;

        return (
            <div className='hk-intro' style={{backgroundColor: background_color}} onClick={ this.onInvokeFull }>
                <img className='background-cover' src={background_pic} />
                <img className='down-btn' ref={ref => this.btn = ref} src={button_pic} onClick={() => { this.sendThunderLog(); this.onAppInvoking(); }}/>
                <img className='down-logo' style={{visibility: this.state.pd != 'new_rap' ? 'visible' : 'hidden'}} src={logo} />
            </div>
        );
    }
}
