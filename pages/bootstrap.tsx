import React from 'react';
import '../src/styles/bootstrap.less';

const Bootstrap = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>12</div>
            </div>
            <div className='row'>
                <div className='col-md-6'>6</div>
                <div className='col-md-6'>6</div>
            </div>
            <div className='row'>
                <div className='col-md-4'>4</div>
                <div className='col-md-4'>4</div>
                <div className='col-md-4'>4</div>
            </div>
            <div className='row'>
                <div className='col-md-3'>3</div>
                <div className='col-md-3'>3</div>
                <div className='col-md-3'>3</div>
                <div className='col-md-3'>3</div>
            </div>
        </div>
    );
};

export default Bootstrap;