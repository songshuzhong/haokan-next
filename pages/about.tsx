import React from 'react';
import {inject, observer} from 'mobx-react';
import {Layout} from '../src/components/lib/layout';
import {Store} from '../src/stores/about';
import {Queue} from '../src/components/lib/queue';

@inject('store')
@observer
export default class About extends React.Component<any, any> {
    static Store = Store;
    componentDidMount() {
        const queue = new Queue(3);

        ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].forEach((i) => queue.push(() => this.job(i)));

        queue.all()
            .then((results) => this.props.store.results = results)
            .then(() => this.props.store.status = 'job finished!');
    }

    job (name) {
        const text = `job ${name}`;
        this.props.store.status = `started ${text}`;
        return new Promise(function (resolve) {
            setTimeout(() => {
                console.log(text, 'finished');
                resolve(text)
            }, 2000)
        })
    }

    render() {
        return (
            <Layout title='about'>
                <h1 onClick={() => this.props.store.increase()}>
                    click me to update the number.
                </h1>
                <h2>{this.props.store.lastUpdate}</h2>
                <h1>{this.props.store.status}</h1>
                <div>{JSON.stringify(this.props.store.results)}</div>
                <a href='/haokan-next/author?app_id=1619184918983136'>link to author.</a>
            </Layout>
        );
    }
}
