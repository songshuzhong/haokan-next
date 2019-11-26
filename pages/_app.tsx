/**
 *@file
 *@Date 2019/07/01
 *@author sshuzhong
 *@mailTo <a href="mailto:songshuzhong@baidu.com.cn">Song ShuZhong</a>
 *@desc
 *@link
 */
import React from 'react';
import App from 'next/app';
import {Provider} from 'mobx-react';
import config from '../config/config.json';

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
    // private fundebug = null;
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

        Object.assign(pageProps, mobxStore, initialProps);

        return {
            pageProps
        };
    }

    constructor(props) {
        super(props);
        if (props.Component.Store) {
            this.store = getOrCreateStore(props.Component.Store);
        }
    }

    componentDidMount() {
        if (!isServer) {
            /*import('fundebug-javascript').then(fundebug => {
                this.fundebug = fundebug;
                // @ts-ignore
                fundebug.apikey = '095b2b18503d9b9f2133b01633508fb235b2b02ecf206dbcc4e49ee97a02a85a';
            });*/
        }
    }

    componentDidCatch(error, errorInfo) {
        if (!isServer) {
            /*this.fundebug.notifyError(error, {
                metaData: {
                    info: errorInfo
                }
            });*/
        }
        super.componentDidCatch(error, errorInfo);
    }

    render() {
        const {Component, ...other} = this.props;
        const contextPath = dev ? '/' : config.prefix;

        Object.assign(this.store, other);

        if (Component.name === 'Injector') {
            return (
                <Provider store={this.store}>
                    <Component {...other} contextPath={contextPath} />
                </Provider>
            );
        } else {
            return <Component {...this.store} contextPath={contextPath} />;
        }
    }
}

export default Application;
