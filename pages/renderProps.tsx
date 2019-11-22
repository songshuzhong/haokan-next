import React, {FunctionComponent, useState} from 'react';

import {Layout} from '../src/components/lib/layout';

const useSetPosition = initial => {
    const [position, setPosition] = useState(initial);
    const setPositions = e => setPosition({x: e.clientX, y: e.clientY});

    return [position, setPositions];
};

const Mouse: FunctionComponent<any> = (props) => {
    const [position, setPositions] = useSetPosition({});

    return (
        <div style={{height: '100px'}} onMouseEnter={setPositions}>
            {props.render(position)}
        </div>
    );
};

const Cat = props => {
    return (
        <div data-cat={props}>x坐标: {props.x}, y坐标: {props.y}</div>
    );
};

const RenderProps = () =>  {
    return (
        <Layout>
            <Mouse render={position => <Cat {...position} />}/>
        </Layout>
    );
};

export default RenderProps;
