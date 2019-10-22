import React from 'react';
import {inject, observer} from 'mobx-react';
import {Layout} from '../components/lib/layout';
import {Store} from '../stores/about';

@inject('store')
@observer
export default class About extends React.Component<any, any> {
    static Store = Store;

    render() {
        return (
            <Layout title='about'>
                <h1 onClick={() => this.props.store.increase()}>
                    click me to update the number.
                </h1>
                <h2>{this.props.store.lastUpdate}</h2>
                <a href='/haokan-next/author?app_id=1619184918983136'>link to author.</a>
            </Layout>
        );
    }
}
