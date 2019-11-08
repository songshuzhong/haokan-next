import React from 'react';
import {inject, observer} from 'mobx-react';
import {Layout} from '../src/components/lib/layout';

@inject('store')
@observer
export default class About extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            countIndex: 1,
            timeout: 1000,
            startTime: new Date().getTime()
        };
    }

    componentDidMount() {

    }

    startCountdow = interval => {
        setTimeout(() => {
            const {timeout, countIndex} = this.state;
            const endTime = new Date().getTime();
            const deviation = endTime - (timeout * countIndex);

            this.setState({countIndex: countIndex + 1});

            this.startCountdow(timeout - deviation);
        }, interval);
    };

    render() {
        return (
            <Layout title='about'
                    styles={[
                        'https://songshuzhong.github.io/visualizer/static/bower_components/bootstrap/dist/css/bootstrap.min.css'
                    ]}
            >
             阿斯顿发撒
            </Layout>
        );
    }
}
