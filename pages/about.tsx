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
        this.state = {
            array: [1, 2, 2, 4, 6, 3, 6, 8, 1]
        };
    }

    componentDidMount() {
        fetch('/haokan-next/api/suggest')
            .then(res => res.json())
            .then(data => console.log('data:', data))
            .catch(e => console.log('error', e.toString()));
    }

    unique = () => {
        const array = this.state.array.sort((a, b) => a - b);
        let index = 0;
        let pre = array[0];

        for (let i = 0; i < array.length; i++) {
            if (pre != array[i]) {
                index++;
                pre = array[i];
            }

            array[index] = array[i];
            console.log(array);
        }

        this.setState({array: array.slice(0, index + 1)});
    }

    render() {
        return (
            <Layout title='about'>
                <h3 onClick={() => this.props.store.increase()}>
                    click me to update the number.
                </h3>
                <h3>{this.props.store.lastUpdate}</h3>
                <h3>{this.props.store.status}</h3>
                <div>{JSON.stringify(this.props.store.results)}</div>
                <h3>{this.state.array}</h3>
                <a href='/haokan-next/author?app_id=1619184918983136'>link to author.</a>
            </Layout>
        );
    }
}
