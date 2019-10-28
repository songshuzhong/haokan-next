/**
 *@file
 *@Date 2019/07/01
 *@author sshuzhong
 *@mailTo <a href="mailto:songshuzhong@baidu.com.cn">Song ShuZhong</a>
 *@desc
 *@link
*/
const path = require('path');

module.exports = withConfig = (app) => {
    const configPath = '../config/config.json';
    app.hkConfig = require(path.resolve(__dirname, configPath)) || {};
}
