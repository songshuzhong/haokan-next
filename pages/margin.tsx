import React from 'react';
import {Layout} from '../src/components/lib/layout';
import Nav from '../src/components/author/nav';
import '../src/styles/margin.less';

const Margin = props => {
    return (
        <Layout>
            <Nav {...props} />
            <div className='div1'>1</div>
            <div className='div2'>2</div>
            <div className='div3'>3</div>
          <div id="loading-status"> <div id="precent"></div> </div>
        </Layout>
    );
};

export default Margin;
