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
import appManager from '../src/components/lib/app-manager';

import config from '../config/config.json';

const dev = process.env.NODE_ENV !== 'production';

class Application extends App<any, any> {
    static async getInitialProps(context) {
        const {Component} = context;
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps.call(Component, context);
        }

        return {pageProps};
    }

    componentDidCatch(error, errorInfo) {
        super.componentDidCatch(error, errorInfo);
    }

    render() {
        const {Component, store, ...other} = this.props;
        const contextPath = dev ? '/' : config.prefix;

        if (Component.name === 'Injector') {
            return (
                <Provider store={store}>
                    <Component {...other} contextPath={contextPath} />
                </Provider>
            );
        } else {
            return <Component {...other} store={store} contextPath={contextPath} />;
        }
    }
}

export default appManager(Application);
