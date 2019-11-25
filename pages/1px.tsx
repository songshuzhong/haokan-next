import React from 'react';

import '../src/styles/1px.less';

const VwVh = () => {
    return (
        <div>
            <p id="dpr">当前设备dpr：</p>
            <div className="border_normal">正常使用1px border效果（本DEMO请在移动端环境下查看）</div>
            <div className="border_gradient">法一：使用渐变实现，使用两种颜色填充 1px 宽内容</div>
            <div className="border_scale">法二：使用缩放实现，对 1px 高度线条进行0.5/0.33倍缩放</div>
            <div className="border_base64">法三：base64 编码实现</div>
            <div className="border_svg">法四：background url 嵌入 SVG 代码实现</div>
        </div>
    );
};

export default VwVh;
