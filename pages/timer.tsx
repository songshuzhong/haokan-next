import React from 'react';
import {inject, observer} from 'mobx-react';
import {Layout} from '../src/components/lib/layout';
import {Store} from '../src/stores/about';

@inject('store')
@observer
export default class About extends React.Component<any, any> {
    static Store = Store;
    private timer = null;
    private ref = null;
    private mill = 0;
    constructor(props) {
        super(props);
        this.state = {
            h: 0,
            m: 0,
            s: 0
        };
    }

    time = () => {
        this.mill += 50;

        let { h, m, s } = this.state;

        if (this.mill >= 1000) {
            this.mill = 0;
            s += 1;
        }

        if (s >= 60) {
            s = 0;
            m += 1;
        }

        if (m >= 60) {
            m = 0;
            h += 1;
        }

        this.setState({h, m, s});
    }

    start = () => {
        this.timer = setInterval(this.time, 50)
    }

    reset = () => {
        clearInterval(this.timer);
        this.setState({
            h: 0,
            m: 0,
            s: 0
        });
        this.ref.innerHTML = '00hh00m00s';
    }

    stop = () => {
        clearInterval(this.timer);
    }

    render() {
        const { h, m, s } = this.state;

        return (
            <Layout title='about'
                    styles={[
                        'https://songshuzhong.github.io/visualizer/static/bower_components/bootstrap/dist/css/bootstrap.min.css'
                    ]}
            >
                <input ref={ref => this.ref = ref} value={`${h}小时${m}分钟${s}分钟`} readOnly={true} />
                <button type='button' className='btn btn-default' onClick={this.start}>start</button>
                <button type='button' className='btn btn-default' onClick={this.stop}>stop</button>
                <button type='button' className='btn btn-default' onClick={this.reset}>reset</button>
            </Layout>
        );
    }
}
