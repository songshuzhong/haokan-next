/**
 *@file
 *@Date 2019/07/01
 *@author sshuzhong
 *@mailTo <a href="mailto:songshuzhong@baidu.com.cn">Song ShuZhong</a>
 *@desc
 *@link
*/
import React from 'react'
import Error from 'next/error'
import fetch from 'isomorphic-unfetch'

export default class ErrorPage extends React.Component<any, any> {
    static async getInitialProps() {
        const res = await fetch('https://api.github.com/repos/zeit/next.js');
        const errorCode = res['statusCode'] > 200 ? res['statusCode'] : false;
        const json = await res.json();

        return { errorCode, stars: json.stargazers_count }
    }

    render() {
        if (this.props.errorCode) {
            return <Error statusCode={this.props.errorCode} />
        }

        return <div>Next stars: {this.props.stars}</div>
    }
}
