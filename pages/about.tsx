import React from 'react';
import fetch from 'isomorphic-unfetch';
import {inject, observer} from 'mobx-react';
import {Layout} from '../components/lib/layout';
import {Store} from '../stores/about';

@inject('store')
@observer
export default class About extends React.Component<any, any> {
    static Store = Store;

    static async getInitialProps(context) {
        const res = await fetch(`https://haokan.baidu.com/haokan/wiseauthor?app_id=${context.router.query.app_id}&_format=json`);
        const response = await res.json();

        return response.apiData;
    }

    render() {
        return (
            <Layout title='about'>
                <h1 onClick={() => this.props.store.increase()}>
                    click me to update the number.
                </h1>
                <h2>{this.props.store.lastUpdate}</h2>
            </Layout>
        );
    }
}
