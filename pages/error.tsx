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

const ErrorPage = props => {
    if (props.errorCode) {
        return <Error statusCode={props.errorCode} />
    }

    return <div>Next stars: {props.stars}</div>
};

ErrorPage.getInitialProps = async() => {
    const res = await fetch('https://api.github.com/repos/zeit/next.js');
    const errorCode = res['statusCode'] > 200 ? res['statusCode'] : false;
    const json = await res.json();

    return { errorCode, stars: json.stargazers_count }
};

export default ErrorPage;
