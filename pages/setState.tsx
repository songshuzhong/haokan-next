import React from 'react';
import {Layout} from '../src/components/lib/layout';

class SetState extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    componentDidMount() {
        document.getElementById('btn')
            .addEventListener('click', () => {
                this.setState({count: this.state.count + 1});
                console.log(this.state.count);
            }, false);
    }

    onIncrease = () => {
        this.setState(prevState => {count: prevState.count + 1});
        this.setState(prevState => {count: prevState.count + 1});
    };

    render() {
        return (
            <Layout
                styles={['https://songshuzhong.github.io/visualizer/static/bower_components/bootstrap/dist/css/bootstrap.min.css']}
            >
                <h1>{this.state.count}</h1>
                <button id='btn' className='btn'>increase</button>
            </Layout>
        );
    }
};

export default SetState;
