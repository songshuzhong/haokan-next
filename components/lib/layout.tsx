import React from 'react';

import Header from './header';

interface IProps {
    title?: string
    keywords?: string
    description?: string
    scripts?: Array<string>
    styles?: Array<string>
    children: any
}

export class Layout extends React.Component<IProps, any> {
    render() {
        const {children, ...other} = this.props;

        return (
            <React.Fragment>
                <Header {...other} />
                {children}
            </React.Fragment>
        );
    }
}
