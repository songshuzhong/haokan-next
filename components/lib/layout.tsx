/**
 *@file
 *@Date 2019/07/01
 *@author sshuzhong
 *@mailTo <a href="mailto:songshuzhong@baidu.com.cn">Song ShuZhong</a>
 *@desc
 *@link
*/
import React from 'react';

import Header from './header';

interface IMeta {
    name: string
    content: string
}
interface IProps {
    title?: string
    metas?: Array<IMeta>
    scripts?: Array<string>
    styles?: Array<string>
    children: any
}

export class Layout extends React.Component<IProps, any> {
    static defaultProps = {
        metas: [
            {name: 'keywords', content: ''},
            {name: 'description', content: ''}
        ]
    };
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
