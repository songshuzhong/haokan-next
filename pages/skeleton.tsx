import React from 'react';
import {Layout} from '../src/components/lib/layout';
import Nav from '../src/components/author/nav';
import '../src/styles/skeleton.less';

const Skeleton = props => {
    return (
        <Layout>
            <Nav {...props} />
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

export default Skeleton;
