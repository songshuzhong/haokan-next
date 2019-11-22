import React from 'react';
import {inject, observer} from 'mobx-react';
import {Layout} from '../src/components/lib/layout';
import {Store} from '../src/stores/about';

@inject('store')
@observer
export default class About extends React.Component<any, any> {
    static Store = Store;
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        fetch(`${this.props.contextPath}/api/suggest/${encodeURIComponent('https://songshuzhong.github.io/visualizer/')}`)
            .then(res => res.json())
            .then(data => console.log('data:', data))
            .catch(e => console.log('error', e.toString()));
    }

    render() {
        return (
            <Layout title='about'>
                <h3 onClick={() => this.props.store.increase()}>
                    update the number.
                </h3>
                <h3>{this.props.store.lastUpdate}</h3>
                <h3>{this.props.store.status}</h3>
                <div>{JSON.stringify(this.props.store.results)}</div>
                <a href='/haokan-next/author?app_id=1619184918983136'>link to author.</a>
            </Layout>
        );
    }
}
