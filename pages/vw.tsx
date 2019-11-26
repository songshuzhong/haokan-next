import React, {Fragment} from 'react';

import '../src/styles/vw.less';

const VwVh = () => {
    return (
        <Fragment>
            {/*<div className='g-container'>
                <h2>腾讯视频</h2>
                <h2>电视语音助手</h2>
                <p>连接后可用手机语音操控电视机，包括搜视频、搜明星、切频道、查天气。</p>
                <div className='g-bg-example' />
                <div className='g-btn-open'>下载腾讯视频，使用语音助手</div>
            </div>*/}
            <div>
                <p id="dpr">当前设备dpr：</p>
                <div className="border_normal">正常使用1px border效果（本DEMO请在移动端环境下查看）</div>
                <div className="border_gradient">法一：使用渐变实现，使用两种颜色填充 1px 宽内容</div>
                <div className="border_scale">法二：使用缩放实现，对 1px 高度线条进行0.5/0.33倍缩放</div>
                <div className="border_base64">法三：base64 编码实现</div>
                <div className="border_svg">法四：background url 嵌入 SVG 代码实现</div>
            </div>
        </Fragment>
    );
};

export default VwVh;
