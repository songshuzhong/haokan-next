import React from 'react';
import App from 'next/app';
import {Provider} from 'mobx-react';
import withMobxStore from '../components/lib/with-mobx-app';

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

        return (
            <Provider store={store}>
                <Component {...other}/>
            </Provider>
        );
    }
}

export default withMobxStore(Application);
