import React from 'react';
import {Layout} from '../src/components/lib/layout';

const iiHoc = WrappedComponent => class extends WrappedComponent<any, any> {
    render() {
        console.log(this.state, 'state');
        return super.render();
    }
}

// @ts-ignore
@iiHoc
export default class Usual extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            usual: 'usual'
        };
    }

    componentDidMount() {
        console.log('page did mount');
    }

    render() {
        return (
            <Layout>
                Usual
            </Layout>
        );
    }
}