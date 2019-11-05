import React from 'react';

import {Layout} from '../src/components/lib/layout';

import '../src/styles/skeleton.less';

export default class Skeleton extends React.Component<any, any> {
    render() {
        return (
            <Layout>
                <div className='skeleton'>
                    <div className='header' />
                    <div className='body'>
                        <div className='title'/>
                        <div className='content' />
                    </div>
                </div>
                <div className='skeleton skeleton-stripes'>
                    <div className='header' />
                    <div className='body'>
                        <div className='title' />
                        <div className='content' />
                    </div>
                </div>
                <div className='skeleton skeleton-strech'>
                    <div className='header' />
                    <div className='body'>
                        <div className='title' />
                        <div className='content' />
                    </div>
                </div>
            </Layout>
        );
    }
}
