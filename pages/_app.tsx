/**
 *@file
 *@Date 2019/07/01
 *@author sshuzhong
 *@mailTo <a href="mailto:songshuzhong@baidu.com.cn">Song ShuZhong</a>
 *@desc
 *@link
 */
import App from 'next/app';
import {Provider} from 'mobx-react';
import setting from '../config/setting.json';
const dev = process.env.NODE_ENV !== 'production';
const isServer = typeof window === 'undefined';
const __NEXT_MOBX_STORE__ = '__NEXT_MOBX_STORE__';

function getOrCreateStore(Store) {
    if (isServer) {
        return new Store();
    }
    if (!window[__NEXT_MOBX_STORE__]) {
        window[__NEXT_MOBX_STORE__] = new Store();
    }
    return window[__NEXT_MOBX_STORE__];
}

class Application extends App<any, any> {
    private store = {};
    static async getInitialProps(context) {
        const {Component} = context;
        let initialProps = {};
        let mobxStore = {};
        let pageProps = {};

        if (context.Component.Store) {
            mobxStore = new context.Component.Store();
        }

        if (Component.getInitialProps && typeof Component.getInitialProps === 'function') {
            initialProps = await Component.getInitialProps.call(Component, context);
        }

        const basename = dev ? '' : setting.basename;
        const version = dev ? '' : setting.version;
        const apiPrefix = basename + version + '/api';

        Object.assign(pageProps, mobxStore, initialProps);

        return {
            basename,
            apiPrefix,
            pageProps
        };
    }

    constructor(props) {
        super(props);
        if (props.Component.Store) {
            this.store = getOrCreateStore(props.Component.Store);
        }
        this.state = this.props.pageProps;
    }

    componentDidCatch(error, errorInfo) {
        super.componentDidCatch(error, errorInfo);
    }

    render() {
        const {Component, ...other} = this.props;

        Object.assign(this.store, other);

        if (Component.name === 'Injector') {
            return (
                <Provider store={this.store}>
                    <Component {...other} />
                </Provider>
            );
        } else {
            return <Component {...this.store} />;
        }
    }
}

export default Application;
