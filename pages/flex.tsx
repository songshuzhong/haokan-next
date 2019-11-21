import React from 'react';
import {Layout} from '../src/components/lib/layout';

import '../src/styles/flex.less';

export default class Flex extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        fetch(`${this.props.contextPath}/api/forceCached`)
            .then(res => res.json())
            .then(data => console.log(data))
    }

    render() {
        return (
            <Layout>
                <div id='flex'>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                </div>
                <div id='bfc'>
                    <div className='box'>box</div>
                    <div className='wrap'>
                        <h1>h1</h1>
                    </div>
                </div>
            </Layout>
        );
    }
}
