import React from 'react';
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

export default (App) => {
    return class AppWithMobx extends React.Component {
        private store = {};
        static async getInitialProps (context) {
            let mobxStore = {};
            let appProps = {
                pageProps: {}
            };

            if (context.Component.Store) {
                mobxStore = new context.Component.Store();
            }
            if (typeof App.getInitialProps === 'function') {
                appProps = await App.getInitialProps.call(App, context);
            }
            const { pageProps, ...other } = appProps;

            return {
                ...other,
                pageProps,
                store: mobxStore
            };
        }

        constructor(props) {
            super(props);
            if (props.Component.Store) {
                this.store = getOrCreateStore(props.Component.Store);
            }
        }

        render() {
            // @ts-ignore
            const { pageProps, ...other } = this.props;

            Object.assign(this.store, pageProps);

            return <App {...other} store={this.store}/>
        }
    }
}
